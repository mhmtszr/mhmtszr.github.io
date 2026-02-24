---
title: "PostgreSQL Full Text Search: Why We Replaced Elasticsearch at Trendyol DisplayAds"
description: "How we moved from Couchbase N1QL through CDC-to-Elasticsearch to native PostgreSQL Full Text Search. A journey of simplification, consistency, and the right tool for the job."
metaDescription: "Trendyol DisplayAds replaced Elasticsearch with PostgreSQL Full Text Search. Learn why we chose native FTS over CDC pipelines, benchmark results, and a practical PostgreSQL FTS tutorial."
date: "2026-02-22"
image: "/article/postgresql-full-text-search/preview.png"
tags: ["PostgreSQL", "Full Text Search", "Elasticsearch", "Couchbase", "CDC", "Trendyol", "DisplayAds", "GIN Index", "tsvector", "Benchmark"]
keywords: ["PostgreSQL full text search", "PostgreSQL vs Elasticsearch", "tsvector tsquery", "GIN index", "Couchbase to PostgreSQL migration", "CDC elasticsearch", "search without elasticsearch"]
---

Adding full-text search to an application usually means spinning up Elasticsearch, OpenSearch, or Solr. That approach works, but it introduces another system to run, sync, and keep consistent. At Trendyol DisplayAds, we challenged that assumption and ended up replacing Elasticsearch with PostgreSQL's built-in full-text search. This article shares our journey, the benchmark results that convinced us, and a practical guide to using PostgreSQL FTS.

## Who Should Read This

Engineers and architects considering search solutions for medium-scale applications will find this useful. If you already use PostgreSQL and your search volume is moderate—hundreds of thousands to a few million documents, tens to low hundreds of queries per second—PostgreSQL Full Text Search may be enough. We cover the trade-offs, benchmark data, and a step-by-step tutorial to evaluate it for your own use case.

**Why consider PostgreSQL FTS before Elasticsearch?** As [Miftahul Huda notes](https://iniakunhuda.medium.com/postgresql-full-text-search-a-powerful-alternative-to-elasticsearch-for-small-to-medium-d9524e001fe0), Elasticsearch is often overkill for small-to-medium apps. It requires additional expertise, complex deployment and monitoring, extra operational cost, and synchronization between your primary database and the search index. PostgreSQL's built-in search provides language support, simpler architecture, cost efficiency, and zero sync lag—all without extra infrastructure.

## Our Search Journey at Trendyol DisplayAds

### The Problem: Couchbase and N1QL

At Trendyol, Couchbase has been our primary document store for many services. DisplayAds relied on Couchbase with N1QL for queries. In production, we ran into N1QL performance limits: query latency increased under load, and some search patterns were hard to optimize. We needed a dedicated search layer that could handle text search efficiently.

### First Attempt: CDC to Elasticsearch

We built and adopted [go-dcp-elasticsearch](https://github.com/Trendyol/go-dcp-elasticsearch), which streams Couchbase documents to Elasticsearch via the Database Change Protocol (DCP). It performed well and reduced search latency, but it introduced several problems:

- **Synchronization and refresh delays.** Elasticsearch's refresh interval means documents are not immediately searchable after indexing. Users often did not see their own just-written changes (read-your-writes consistency was broken), which was unacceptable for our product flows.
- **DCP protocol constraints.** The DCP stream only carries the latest state per document. If indexing a document to Elasticsearch failed, we had no way to replay that change. We either had to process vbucket events without blocking (and accept possible data loss) or persist failed documents somewhere for retry.
- **Additional system to operate.** We now had to run, monitor, and scale another service (the connector) plus Elasticsearch itself. Failures in the pipeline directly affected search freshness and correctness.

### The Turning Point: PostgreSQL Migration

DisplayAds' document model—relational entities, clear schemas, and transactional updates—fits PostgreSQL better than Couchbase. We planned a migration to PostgreSQL, which raised a key question: should we keep Elasticsearch for search?

Keeping it would mean another CDC pipeline, this time from PostgreSQL to Elasticsearch. Trendyol has [go-pq-cdc-elasticsearch](https://github.com/Trendyol/go-pq-cdc-elasticsearch) for this purpose, which streams PostgreSQL changes to Elasticsearch via logical replication. It solves the Couchbase-specific DCP replay limitation, but the fundamental challenges remain: Elasticsearch is eventually consistent, and the connector is another moving part to run and debug.

Our Staff Engineer, Nurettin Bakkal, suggested we evaluate PostgreSQL Full Text Search first. Our workload—moderate data size and query volume—made this approach plausible. We ran a POC and benchmarks; the results were strong enough to adopt PostgreSQL FTS as our primary search solution.

## LIKE, Regex, and Full-Text Search: Why They're Different

Like many developers, our initial approach to implementing search functionality in databases was refreshingly simple, if not a bit naive:

```sql
SELECT * FROM products
WHERE description LIKE '%keyboard%';
```

We would sprinkle in some wildcards, maybe throw in a case-insensitive `ILIKE` operator, and call it a day. When requirements got more specific, we'd reach for regular expressions, feeling quite clever about patterns like:

```sql
SELECT * FROM products
WHERE description ~* '\\ykeyboard\\y';
```

This approach worked fine for small projects and simple search requirements. However, reality hit hard when we encountered our first real-world search challenge.

**What LIKE and regex cannot do:**

- **Stemming**: `LIKE '%running%'` won't match "run" or "ran"; you need separate patterns for each word form.
- **Stop words**: Queries like "the best keyboard" still scan rows containing "the" and "best", adding noise and slowing scans.
- **Ranking**: Every match is treated equally; you get no relevance scoring.
- **Index efficiency**: B-tree indexes work for `LIKE 'word%'` (prefix match) but not for `'%word%'`; the latter forces full-table scans. Regex behaves similarly.

**What PostgreSQL Full-Text Search adds:**

- **Lexemes**: Text is normalized (lowercased, stemmed, stop words removed) into searchable tokens.
- **tsvector**: Pre-computed, indexed representation of document content with positions and weights for ranking.
- **tsquery**: Structured queries with AND, OR, NOT, and phrase operators.
- **GIN index**: Enables fast lookups instead of full-table scans.

The diagram below summarizes how documents become tsvectors and how tsquery enables efficient, ranked search:

<div className="text-center my-6">
  <img src="/article/postgresql-full-text-search/postgresql-fts-core-concepts.png" className="mx-auto max-w-full" style={{maxWidth: "800px", height: "auto"}} alt="PostgreSQL Full-Text Search Core Concepts"/>
</div>

## Benchmark: PostgreSQL FTS vs Elasticsearch

### Specification

Both systems ran in containers (Podman, 8 GB VM) on the same host. This is a local, single-machine benchmark—not a production deployment test.

<div className="overflow-x-auto md:overflow-visible my-6">
<table className="min-w-[400px] w-full max-w-full">
<thead>
  <tr>
    <th className="border border-gray-300 px-4 py-2">Spec</th>
    <th className="border border-gray-300 px-4 py-2">Value</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Hardware**</td>
    <td className="border border-gray-300 px-4 py-2 ">Apple M1 Max, 32 GB RAM</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Runtime**</td>
    <td className="border border-gray-300 px-4 py-2 ">Podman containers, 8 GB VM memory</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**PostgreSQL**</td>
    <td className="border border-gray-300 px-4 py-2 ">16, <code>searchable_docs</code> table (title, description, tags), generated <code>tsvector</code> column, GIN index</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Elasticsearch**</td>
    <td className="border border-gray-300 px-4 py-2 ">8.11, single node, 1 primary shard, 1 GB heap</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Data**</td>
    <td className="border border-gray-300 px-4 py-2 ">Synthetic documents (display ad metadata)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Data sizes**</td>
    <td className="border border-gray-300 px-4 py-2 ">10K, 50K, 100K documents</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Load levels**</td>
    <td className="border border-gray-300 px-4 py-2 ">10, 50, 200 concurrent workers</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Run duration**</td>
    <td className="border border-gray-300 px-4 py-2 ">10 seconds per (size, load) combination</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 ">**Metrics**</td>
    <td className="border border-gray-300 px-4 py-2 ">TPS, p50, p95, p99 latency (ms)</td>
  </tr>
</tbody>
</table>
</div>

### Results

#### Read (Search) Performance

<div className="overflow-x-auto md:overflow-visible my-6">
<table className="min-w-[600px] w-full max-w-full text-sm">
<thead>
  <tr>
    <th className="border border-gray-300 px-4 py-2" rowSpan="2">Documents</th>
    <th className="border border-gray-300 px-4 py-2" colSpan="2">10 Workers</th>
    <th className="border border-gray-300 px-4 py-2" colSpan="2">50 Workers</th>
    <th className="border border-gray-300 px-4 py-2" colSpan="2">200 Workers</th>
  </tr>
  <tr>
    <th className="border border-gray-300 px-3 py-1">TPS</th>
    <th className="border border-gray-300 px-3 py-1">p95 (ms)</th>
    <th className="border border-gray-300 px-3 py-1">TPS</th>
    <th className="border border-gray-300 px-3 py-1">p95 (ms)</th>
    <th className="border border-gray-300 px-3 py-1">TPS</th>
    <th className="border border-gray-300 px-3 py-1">p95 (ms)</th>
  </tr>
</thead>
<tbody>
  <tr><td className="border border-gray-300 px-4 py-2" colSpan="7">**PostgreSQL**</td></tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">10K</td>
    <td className="border border-gray-300 px-3 py-1">3,019</td>
    <td className="border border-gray-300 px-3 py-1">5.31</td>
    <td className="border border-gray-300 px-3 py-1">3,089</td>
    <td className="border border-gray-300 px-3 py-1">31.06</td>
    <td className="border border-gray-300 px-3 py-1">3,550</td>
    <td className="border border-gray-300 px-3 py-1">113.47</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">50K</td>
    <td className="border border-gray-300 px-3 py-1">707</td>
    <td className="border border-gray-300 px-3 py-1">18.89</td>
    <td className="border border-gray-300 px-3 py-1">1,042</td>
    <td className="border border-gray-300 px-3 py-1">74.54</td>
    <td className="border border-gray-300 px-3 py-1">986</td>
    <td className="border border-gray-300 px-3 py-1">306.09</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">100K</td>
    <td className="border border-gray-300 px-3 py-1">284</td>
    <td className="border border-gray-300 px-3 py-1">49.25</td>
    <td className="border border-gray-300 px-3 py-1">483</td>
    <td className="border border-gray-300 px-3 py-1">159.17</td>
    <td className="border border-gray-300 px-3 py-1">502</td>
    <td className="border border-gray-300 px-3 py-1">557.30</td>
  </tr>
  <tr><td className="border border-gray-300 px-4 py-2" colSpan="7">**Elasticsearch**</td></tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">10K</td>
    <td className="border border-gray-300 px-3 py-1">2,346</td>
    <td className="border border-gray-300 px-3 py-1">6.58</td>
    <td className="border border-gray-300 px-3 py-1">2,252</td>
    <td className="border border-gray-300 px-3 py-1">7.00</td>
    <td className="border border-gray-300 px-3 py-1">2,239</td>
    <td className="border border-gray-300 px-3 py-1">7.33</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">50K</td>
    <td className="border border-gray-300 px-3 py-1">2,301</td>
    <td className="border border-gray-300 px-3 py-1">6.55</td>
    <td className="border border-gray-300 px-3 py-1">2,190</td>
    <td className="border border-gray-300 px-3 py-1">7.08</td>
    <td className="border border-gray-300 px-3 py-1">2,133</td>
    <td className="border border-gray-300 px-3 py-1">7.54</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">100K</td>
    <td className="border border-gray-300 px-3 py-1">2,200</td>
    <td className="border border-gray-300 px-3 py-1">6.90</td>
    <td className="border border-gray-300 px-3 py-1">2,176</td>
    <td className="border border-gray-300 px-3 py-1">7.08</td>
    <td className="border border-gray-300 px-3 py-1">2,164</td>
    <td className="border border-gray-300 px-3 py-1">7.33</td>
  </tr>
</tbody>
</table>
</div>

PostgreSQL outperforms Elasticsearch for small datasets: ~3,019 TPS vs ~2,346 TPS at 10K/10 workers, with comparable p95 latency. At 10K/200 workers, PostgreSQL reaches 3,550 TPS — roughly 1.6× Elasticsearch. However, as data grows, PostgreSQL slows: at 100K/10 workers it drops to 284 TPS (p95 49 ms) while Elasticsearch stays at ~2,200 TPS (p95 7 ms). Elasticsearch's inverted index and thread-pool model keep performance flat regardless of data size or concurrency.

For DisplayAds' moderate scale (tens of thousands of documents, low concurrency), PostgreSQL read performance was more than sufficient — and actually faster than Elasticsearch.

#### Write (Insert with Indexing) Performance

Both systems index documents at write time. In PostgreSQL, the `GENERATED ALWAYS AS ... STORED` column computes the `tsvector` during every INSERT and UPDATE, and the GIN index is updated accordingly — similar to how Elasticsearch analyzes and indexes documents on ingestion.

<div className="overflow-x-auto md:overflow-visible my-6">
<table className="min-w-[400px] w-full max-w-full text-sm">
<thead>
  <tr>
    <th className="border border-gray-300 px-4 py-2">Workers</th>
    <th className="border border-gray-300 px-4 py-2" colSpan="2">PostgreSQL</th>
    <th className="border border-gray-300 px-4 py-2" colSpan="2">Elasticsearch</th>
  </tr>
  <tr>
    <th className="border border-gray-300 px-3 py-1"></th>
    <th className="border border-gray-300 px-3 py-1">TPS</th>
    <th className="border border-gray-300 px-3 py-1">p95 (ms)</th>
    <th className="border border-gray-300 px-3 py-1">TPS</th>
    <th className="border border-gray-300 px-3 py-1">p95 (ms)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="border border-gray-300 px-4 py-2">10</td>
    <td className="border border-gray-300 px-3 py-1">5,978</td>
    <td className="border border-gray-300 px-3 py-1">2.29</td>
    <td className="border border-gray-300 px-3 py-1">2,462</td>
    <td className="border border-gray-300 px-3 py-1">5.80</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">50</td>
    <td className="border border-gray-300 px-3 py-1">5,773</td>
    <td className="border border-gray-300 px-3 py-1">16.55</td>
    <td className="border border-gray-300 px-3 py-1">2,359</td>
    <td className="border border-gray-300 px-3 py-1">6.18</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2">200</td>
    <td className="border border-gray-300 px-3 py-1">5,484</td>
    <td className="border border-gray-300 px-3 py-1">46.01</td>
    <td className="border border-gray-300 px-3 py-1">2,319</td>
    <td className="border border-gray-300 px-3 py-1">6.53</td>
  </tr>
</tbody>
</table>
</div>

PostgreSQL achieves ~2.4× higher write throughput than Elasticsearch across all concurrency levels, despite computing tsvectors and updating the GIN index on every insert. The tsvector generation cost is negligible compared to Elasticsearch's HTTP and Lucene segment overhead.

## PostgreSQL Full Text Search: A Practical Guide

This section is a hands-on reference for implementing PostgreSQL FTS. If you are reading this as a presentation, feel free to skip ahead to the [Conclusion](#conclusion)—you can return here when you are ready to implement.

It is based on [Adam Cooper's excellent posts](https://admcpr.com/postgres-full-text-search-is-better-than-part1/), [Miftahul Huda's practical guide](https://iniakunhuda.medium.com/postgresql-full-text-search-a-powerful-alternative-to-elasticsearch-for-small-to-medium-d9524e001fe0), and the [PostgreSQL documentation](https://www.postgresql.org/docs/current/textsearch.html).

### tsvector and to_tsvector

A `tsvector` is a sorted list of distinct *lexemes*—normalized tokens used for matching. `to_tsvector` turns raw text into a `tsvector`:

```sql
SELECT to_tsvector('I am altering the deal. Pray I do not alter it further!');
```

Output: `'alter':3,10 'deal':5 'further':12 'pray':6` (stop words like "I", "am", "the" are removed; words are stemmed and positions preserved).

### tsquery and Matching

A `tsquery` represents a search condition. Use `@@` to check if a `tsvector` matches a `tsquery`:

```sql
SELECT title FROM movies WHERE to_tsvector(title) @@ to_tsquery('star');
```

`tsquery` requires operator-separated tokens. Plain text like `'star wars'` is invalid. Use `plainto_tsquery` to build a query from user input:

```sql
SELECT title, ts_rank(to_tsvector(title), plainto_tsquery('star wars')) AS rank
FROM movies
WHERE to_tsvector(title) @@ plainto_tsquery('star wars')
ORDER BY rank DESC;
```

### websearch_to_tsquery: User-Friendly Syntax

`websearch_to_tsquery` supports a simple, familiar syntax:

- `"quoted text"` → phrase match (terms in order)
- `-` → NOT
- `OR` → OR
- Unquoted terms are ANDed by default

For programmatic phrase queries, `phraseto_tsquery` builds a tsquery that requires terms to appear in sequence.

Example: search for "star wars" but exclude "clone":

```sql
SELECT title, ts_rank(title_search, websearch_to_tsquery('"star wars" -clone')) AS rank
FROM searchable_docs
WHERE title_search @@ websearch_to_tsquery('"star wars" -clone')
ORDER BY rank DESC;
```

### Multi-Column Search with setweight

Use `setweight` to give different columns different importance (A highest, D lowest):

```sql
SELECT setweight(to_tsvector(title), 'A') || setweight(to_tsvector(description), 'B')
FROM searchable_docs;
```

### Generated Columns for tsvector

Instead of computing `tsvector` at query time, store it in a generated column so the vector is built once at write time—just like Elasticsearch indexes documents on ingestion. This shifts the cost from read to write, enabling fast searches via the pre-computed column and GIN index:

```sql
ALTER TABLE searchable_docs
ADD COLUMN title_search tsvector
GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(tags, '')), 'C')
) STORED;
```

Use `coalesce` to handle NULL columns—`to_tsvector(NULL)` returns NULL and would break the expression; `coalesce(title, '')` guarantees a string. Use the `'simple'` text search config so the expression is immutable (generated columns require this); language configs like `'english'` depend on locale and dictionaries that can change. With this approach, every INSERT and UPDATE automatically recomputes the `tsvector`—your application never needs to manage indexing separately.

### GIN Index for Performance

Without an index, full-text search does a sequential scan. Add a GIN index on the `tsvector` column:

```sql
CREATE INDEX idx_search ON searchable_docs USING GIN(title_search);
```

This reduces query time from tens of milliseconds to well under a millisecond for typical datasets.

### Text Search Configuration

PostgreSQL uses text search configurations for language-specific behavior. `simple` lowercases and removes a minimal set of stop words. Language configs (e.g. `english`) add stemming:

```sql
SELECT to_tsvector('english', 'To fish the fishes a fishy fisher fished');
```

Output: `'fish':2,4,6,7,8` (all forms normalized to "fish"; stop word positions 1, 3, 5 are skipped).

PostgreSQL also supports `turkish` for Turkish text:

```sql
SELECT to_tsvector('turkish', 'Türkiye''nin en büyük e-ticaret platformunda arama yapıyoruz');
```

Output: `'ara':6 'büyük':3 'e-ticaret':4 'platform':5 'türkiy':1 'yap':7` (Turkish stop words "nin", "en", "da" are removed; suffixes are stripped by the Turkish stemmer).

### ts_rank Normalization

By default, `ts_rank` does not account for document length. Short documents that match exactly can rank lower than longer ones. Use the normalization parameter:

```sql
SELECT title, ts_rank(title_search, websearch_to_tsquery('rush'), 1) AS rank
FROM searchable_docs
WHERE title_search @@ websearch_to_tsquery('rush')
ORDER BY rank DESC;
```

The third argument `1` divides the rank by `1 + log(document length)`, improving ranking for short, exact matches.

### ts_headline: Highlighting Matches in Results

Use `ts_headline` to return a snippet of matching content with search terms wrapped for highlighting:

```sql
SELECT title,
  ts_headline('english', description, websearch_to_tsquery('postgresql'),
    'StartSel=<mark>, StopSel=</mark>, MaxFragments=1, MaxWords=50, MinWords=20') AS snippet
FROM searchable_docs
WHERE title_search @@ websearch_to_tsquery('postgresql')
ORDER BY ts_rank(title_search, websearch_to_tsquery('postgresql')) DESC;
```

This returns a single fragment of 20–50 words with matches wrapped in `<mark>` tags, useful for search result previews.

### Extensions: pg_trgm and unaccent

For fuzzy search (typo tolerance) and diacritic handling:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;   -- Trigram similarity, e.g. similarity('keybord', 'keyboard')
CREATE EXTENSION IF NOT EXISTS unaccent;  -- Removes diacritics: 'café' matches 'cafe'
```

`pg_trgm` enables `%` and `<->` operators for similarity matching; `unaccent` helps with international content.

### Complete Example

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT,
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(tags, '')), 'C')
    ) STORED
);

CREATE INDEX idx_products_search ON products USING GIN(search_vector);

SELECT id, title, ts_rank(search_vector, websearch_to_tsquery('premium wireless')) AS rank
FROM products
WHERE search_vector @@ websearch_to_tsquery('premium wireless')
ORDER BY rank DESC
LIMIT 20;
```

## Conclusion

For DisplayAds, PostgreSQL Full Text Search was the right choice. We eliminated an entire layer of infrastructure—Elasticsearch, CDC connectors, and the operational burden that came with them—and replaced it with a feature already built into our primary database.

What we gained:

- **Strong consistency**: No sync lag; read-your-writes by default. Every INSERT is immediately searchable.
- **Simpler architecture**: One database instead of PostgreSQL + Elasticsearch + CDC pipeline.
- **Lower operational load**: Fewer services to run, monitor, and debug at 3 AM.
- **Write performance**: ~2.4× faster write throughput than Elasticsearch. The tsvector is computed at insert time via a generated column—lightweight compared to HTTP-based indexing.
- **Competitive read performance**: At 10K documents, PostgreSQL actually outperforms Elasticsearch (~3,019 vs ~2,346 TPS). At our moderate scale, read latency is well within requirements.

PostgreSQL FTS is not a replacement for Elasticsearch in every scenario. While PostgreSQL's full-text search is powerful, Elasticsearch may be the better choice when:

- Your data volume exceeds several million records
- You need distributed search across multiple nodes
- You require complex aggregations and analytics
- You need advanced features like geospatial search or image search
- Your search load exceeds thousands of queries per second

For moderate scale and consistency needs, PostgreSQL Full Text Search is a powerful, built-in alternative. Before adding another system to your stack, benchmark the one you already have.
