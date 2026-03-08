"use client"

import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {PhotoDetail} from "@/components/ui/photo-detail"
import Image from "next/image"
import {DeferredImage} from "@/components/ui/deferred-image"
import {PageContainer} from "../components/page-container"

// Photography data with actual photos
const photos = [
    {
        url: '/photography/tokyo.webp',
        title: 'Shibuya Crossing',
        city: 'Tokyo',
        country: 'Japan'
    },
    {
        url: '/photography/kyoto.webp',
        title: 'Hokan-ji',
        city: 'Kyoto',
        country: 'Japan'
    },
    {
        url: '/photography/kyoto2.webp',
        title: 'Fushimi Inari Taisha',
        city: 'Kyoto',
        country: 'Japan'
    },
    {
        url: '/photography/nara.webp',
        title: 'Nara',
        city: 'Nara',
        country: 'Japan'
    },
    {
        url: '/photography/universalstudios.webp',
        title: 'Universal Studios Japan',
        city: 'Osaka',
        country: 'Japan'
    },
    {
        url: '/photography/london.webp',
        title: 'London',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/bigben.webp',
        title: 'Big Ben',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/bigben2.webp',
        title: 'Big Ben',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/bigben3.webp',
        title: 'Big Ben',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/bankstation.webp',
        title: 'Bank Station',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/bloomberg.webp',
        title: 'Bloomberg Office',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/towerbridge.webp',
        title: 'Tower Bridge',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/londoneye.webp',
        title: 'London Eye',
        city: 'London',
        country: 'England'
    },
    {
        url: '/photography/edinburgh.webp',
        title: 'Edinburgh',
        city: 'Edinburgh',
        country: 'Scotland'
    },
    {
        url: '/photography/victoria_street.webp',
        title: 'Victoria Street',
        city: 'Edinburgh',
        country: 'Scotland'
    },
    {
        url: '/photography/dean_village.webp',
        title: 'Dean Village',
        city: 'Edinburgh',
        country: 'Scotland'
    },
    {
        url: '/photography/waverley_bridge.webp',
        title: 'Waverley Bridge',
        city: 'Edinburgh',
        country: 'Scotland'
    },
    {
        url: '/photography/newtontree.webp',
        title: 'Newton Tree',
        city: 'Cambridge',
        country: 'England'
    },
    {
        url: '/photography/cambridgecollege.webp',
        title: 'Cambridge College',
        city: 'Cambridge',
        country: 'England'
    },
    {
        url: '/photography/phuket.webp',
        title: 'Phuket',
        city: 'Phuket',
        country: 'Thailand'
    },
    {
        url: '/photography/james_bond_island.webp',
        title: 'James Bond Island',
        city: 'Phuket',
        country: 'Thailand'
    },
    {
        url: '/photography/panyee.webp',
        title: 'Panye Island',
        city: 'Phuket',
        country: 'Thailand'
    },
    {
        url: '/photography/maya_bay.webp',
        title: 'Maya Bay',
        city: 'Phuket',
        country: 'Thailand'
    },
    {
        url: '/photography/bangkok.webp',
        title: 'Chao Phraya River',
        city: 'Bangkok',
        country: 'Thailand'
    },
    {
        url: '/photography/bangkok_2.webp',
        title: 'Lumphini Park',
        city: 'Bangkok',
        country: 'Thailand'
    },
    {
        url: '/photography/bangkok_3.webp',
        title: 'Temple of the Golden Buddha',
        city: 'Bangkok',
        country: 'Thailand'
    },
    {
        url: '/photography/havana.webp',
        title: 'National Capitol of Cuba',
        city: 'Havana',
        country: 'Cuba'
    },
    {
        url: '/photography/kübaatatürk.webp',
        title: 'Atatürk Statue',
        city: 'Havana',
        country: 'Cuba'
    },
    {
        url: '/photography/varadero.webp',
        title: 'North Atlantic Ocean',
        city: 'Varadero',
        country: 'Cuba'
    },
    {
        url: '/photography/trinidad.webp',
        title: 'Romance Museum',
        city: 'Trinidad',
        country: 'Cuba'
    },
    {
        url: '/photography/vinales.webp',
        title: 'Vinales',
        city: 'Vinales',
        country: 'Cuba'
    },
    {
        url: '/photography/budva.webp',
        title: 'Dancing Girl',
        city: 'Budva',
        country: 'Montenegro'
    },
    {
        url: '/photography/sveti_stefan.webp',
        title: 'Sveti Stefan',
        city: 'Budva',
        country: 'Montenegro'
    },
    {
        url: '/photography/kotor.webp',
        title: 'Kotor Castle',
        city: 'Kotor',
        country: 'Montenegro'
    },
    {
        url: '/photography/perast.webp',
        title: 'Perast',
        city: 'Perast',
        country: 'Montenegro'
    },
    {
        url: '/photography/perast_2.webp',
        title: 'Perast',
        city: 'Perast',
        country: 'Montenegro'
    },
    {
        url: '/photography/novi_sad.webp',
        title: 'The Name of Mary Church',
        city: 'Novi Sad',
        country: 'Serbia'
    },
    {
        url: '/photography/belgrade_2.webp',
        title: "St. Mark's Church",
        city: 'Belgrade',
        country: 'Serbia'
    },
    {
        url: '/photography/belgrade.webp',
        title: 'The Belgrade Fortress',
        city: 'Belgrade',
        country: 'Serbia'
    },
    {
        url: '/photography/barcelona2.webp',
        title: 'Tibidabo Amusement Park',
        city: 'Barcelona',
        country: 'Spain'
    },
    {
        url: '/photography/roma.webp',
        title: 'Altare della Patria',
        city: 'Rome',
        country: 'Italy'
    },
    {
        url: '/photography/paris.webp',
        title: 'Eiffel Tower',
        city: 'Paris',
        country: 'France'
    },
    {
        url: '/photography/madrid.webp',
        title: 'Santiago Bernabéu Stadium',
        city: 'Madrid',
        country: 'Spain'
    },
    {
        url: '/photography/barcelona.webp',
        title: 'La Font Magica',
        city: 'Barcelona',
        country: 'Spain'
    },
    {
        url: '/photography/prag.webp',
        title: 'Dancing House',
        city: 'Prague',
        country: 'Czech Republic'
    },
    {
        url: '/photography/venice.webp',
        title: 'Venice',
        city: 'Venice',
        country: 'Italy'
    },
    {
        url: '/photography/paris2.webp',
        title: 'Louvre Museum',
        city: 'Paris',
        country: 'France'
    },
    {
        url: '/photography/florence.webp',
        title: 'Ponte Vecchio',
        city: 'Florence',
        country: 'Italy'
    },
    {
        url: '/photography/munich.webp',
        title: 'Marienplatz',
        city: 'Munich',
        country: 'Germany'
    },
    {
        url: '/photography/brussels.webp',
        title: '2018 FIFA World Cup Belgium - Brazil',
        city: 'Brussels',
        country: 'Belgium'
    },
    {
        url: '/photography/amsterdam.webp',
        title: 'One of many channels',
        city: 'Amsterdam',
        country: 'Netherlands'
    },
    {
        url: '/photography/berlin.webp',
        title: 'Reichstag Building',
        city: 'Berlin',
        country: 'Germany'
    },
    {
        url: '/photography/hardrockprag.webp',
        title: 'Hard Rock Cafe',
        city: 'Prague',
        country: 'Czech Republic'
    },
    {
        url: '/photography/pisa.webp',
        title: 'Leaning Tower of Pisa',
        city: 'Pisa',
        country: 'Italy'
    },
    {
        url: '/photography/barcelonaview.webp',
        title: 'Park Guell',
        city: 'Barcelona',
        country: 'Spain'
    },
    {
        url: '/photography/el_retiro.webp',
        title: 'El Retiro Park',
        city: 'Madrid',
        country: 'Spain'
    },
    {
        url: '/photography/familia.webp',
        title: 'La Sagrada Familia',
        city: 'Barcelona',
        country: 'Spain'
    },
    {
        url: '/photography/romatrevi.webp',
        title: 'Fontana di Trevi',
        city: 'Rome',
        country: 'Italy'
    },
    {
        url: '/photography/mostar.webp',
        title: 'Old Bridge',
        city: 'Mostar',
        country: 'Bosnia and Herzegovina'
    },
    {
        url: '/photography/alperenler_tekkesi.webp',
        title: 'Blagaj tekija',
        city: 'Mostar',
        country: 'Bosnia and Herzegovina'
    },
    {
        url: '/photography/saraybosna.webp',
        title: 'Sarajevo',
        city: 'Sarajevo',
        country: 'Bosnia and Herzegovina'
    },
    {
        url: '/photography/igneada.webp',
        title: 'İğneada Longoz Ormanları',
        city: 'Kırklareli',
        country: 'Turkey'
    },
    {
        url: '/photography/kekova.webp',
        title: 'Kekova, Batık Şehir',
        city: 'Antalya',
        country: 'Turkey'
    },
    {
        url: '/photography/erfelek_1.webp',
        title: 'Erfelek Tatlica Falls',
        city: 'Sinop',
        country: 'Turkey'
    },
    {
        url: '/photography/cengelköy.webp',
        title: 'Cengelköy',
        city: 'Istanbul',
        country: 'Turkey'
    },
    {
        url: '/photography/adrasan2.webp',
        title: 'Adrasan Beach',
        city: 'Antalya',
        country: 'Turkey'
    },
    {
        url: '/photography/izmir.webp',
        title: 'Bostanlı',
        city: 'Izmir',
        country: 'Turkey'
    },
    {
        url: '/photography/alanya.webp',
        title: 'Alanya',
        city: 'Alanya',
        country: 'Turkey'
    },
    {
        url: '/photography/hacettepe.webp',
        title: 'Hacettepe University Green Valley',
        city: 'Ankara',
        country: 'Turkey'
    },
    {
        url: '/photography/büyükada.webp',
        title: 'Büyükada',
        city: 'Istanbul',
        country: 'Turkey'
    },
    {
        url: '/photography/karabük.webp',
        title: 'A beautiful frame that I caught on a long journey with our bikes',
        city: 'Karabük',
        country: 'Turkey'
    },
    {
        url: '/photography/izmirbisiklet.webp',
        title: 'A moment from our bike tour',
        city: 'Izmir',
        country: 'Turkey'
    },
    {
        url: '/photography/kapadokya.webp',
        title: 'Kapadokya',
        city: 'Nevşehir',
        country: 'Turkey'
    },
    {
        url: '/photography/adrasan.webp',
        title: 'Adrasan Beach',
        city: 'Antalya',
        country: 'Turkey'
    },
    {
        url: '/photography/antalya.webp',
        title: 'Boğazkent',
        city: 'Antalya',
        country: 'Turkey'
    },
    {
        url: '/photography/asansör.webp',
        title: 'Tarihi Asansör',
        city: 'Izmir',
        country: 'Turkey'
    },
    {
        url: '/photography/bolu.webp',
        title: 'Yedigöller National Park',
        city: 'Bolu',
        country: 'Turkey'
    },
    {
        url: '/photography/expo2016.webp',
        title: 'Expo 2016',
        city: 'Antalya',
        country: 'Turkey'
    },
    {
        url: '/photography/ilgaz.webp',
        title: 'Ilgaz Mountain National Park',
        city: 'Kastamonu',
        country: 'Turkey'
    },
    {
        url: '/photography/istanbulboat.webp',
        title: 'Boat Tour',
        city: 'Istanbul',
        country: 'Turkey'
    },
    {
        url: '/photography/safari.webp',
        title: 'Safari Tour',
        city: 'Serik',
        country: 'Turkey'
    },
    {
        url: '/photography/eskisehir2.webp',
        title: 'Sehr-i Ask Adasi',
        city: 'Eskisehir',
        country: 'Turkey'
    },
    {
        url: '/photography/kapulukaya.webp',
        title: 'Kapulukaya Baraji',
        city: 'Kirikkale',
        country: 'Turkey'
    },
    {
        url: '/photography/heybeliada.webp',
        title: 'Heybeliada',
        city: 'Istanbul',
        country: 'Turkey'
    },
    {
        url: '/photography/kas.webp',
        title: 'Kaş',
        city: 'Antalya',
        country: 'Turkey'
    },
    {
        url: '/photography/erfelek_2.webp',
        title: 'Erfelek Tatlica Falls',
        city: 'Sinop',
        country: 'Turkey'
    },
    {
        url: '/photography/eskişehir.webp',
        title: 'Odunpazarı houses',
        city: 'Eskisehir',
        country: 'Turkey'
    }
];

// Pre-compute unique countries
const uniqueCountries = ["All", ...Array.from(
    new Set(photos.map(photo => photo.country))
)]

const BATCH_SIZE = 9;

function PhotographyContent() {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
    const [filter, setFilter] = useState("All")
    const [displayCount, setDisplayCount] = useState(BATCH_SIZE)
    const [isLoading, setIsLoading] = useState(false)
    const [isChangingCountry, setIsChangingCountry] = useState(false)
    const observerTarget = useRef<HTMLDivElement>(null)
    const isInitialMount = useRef(true)

    // Filter photos based on selected country
    const filteredPhotos = useMemo(() =>
            filter === "All" ? photos : photos.filter(photo => photo.country === filter),
        [filter]
    )

    // Get the current batch of photos to display
    const displayedPhotos = useMemo(() =>
            filteredPhotos.slice(0, displayCount),
        [filteredPhotos, displayCount]
    )

    const hasMorePhotos = displayCount < filteredPhotos.length

    const loadMorePhotos = useCallback(() => {
        if (!hasMorePhotos || isLoading) return;

        setIsLoading(true);
        // Use requestAnimationFrame for smoother loading
        requestAnimationFrame(() => {
            setDisplayCount(prevCount => {
                const nextCount = prevCount + BATCH_SIZE;
                const finalCount = Math.min(nextCount, filteredPhotos.length);

                // Only clear loading when the state is actually updated
                requestAnimationFrame(() => {
                    setIsLoading(false);
                });

                return finalCount;
            });
        });
    }, [hasMorePhotos, isLoading, filteredPhotos.length]);

    // Reset when filter changes (skip skeleton on initial mount for faster LCP)
    useEffect(() => {
        setDisplayCount(BATCH_SIZE);
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        setIsChangingCountry(true);
        const timer = setTimeout(() => setIsChangingCountry(false), 300);
        return () => clearTimeout(timer);
    }, [filter]);

    // Optimized Intersection Observer setup
    useEffect(() => {
        if (!observerTarget.current || isChangingCountry) return;

        const observer = new IntersectionObserver(entries => {
            const first = entries[0];
            if (first.isIntersecting && hasMorePhotos && !isLoading) {
                loadMorePhotos();
            }
        }, {
            threshold: 0.1,
            rootMargin: '100px',
        });

        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [loadMorePhotos, hasMorePhotos, isLoading, isChangingCountry]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPhotoIndex === null) return

            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                setSelectedPhotoIndex(
                    selectedPhotoIndex === 0 ? filteredPhotos.length - 1 : selectedPhotoIndex - 1
                )
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault()
                setSelectedPhotoIndex(
                    selectedPhotoIndex === filteredPhotos.length - 1 ? 0 : selectedPhotoIndex + 1
                )
            }
        }

        if (selectedPhotoIndex !== null) {
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedPhotoIndex, filteredPhotos])

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedPhotoIndex === null) return
        setSelectedPhotoIndex(
            selectedPhotoIndex === 0 ? filteredPhotos.length - 1 : selectedPhotoIndex - 1
        )
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedPhotoIndex === null) return

        // If we're at the last loaded photo and there are more to load
        if (selectedPhotoIndex === displayedPhotos.length - 1 && hasMorePhotos) {
            loadMorePhotos()
            // Keep the dialog open and wait for more photos
            return
        }

        // Regular navigation within loaded photos
        if (selectedPhotoIndex < filteredPhotos.length - 1) {
            setSelectedPhotoIndex(selectedPhotoIndex + 1)
        }
    }

    // Update selected photo index when more photos are loaded
    useEffect(() => {
        // Only proceed if we're in detail view and at the end of current batch
        if (selectedPhotoIndex !== null && selectedPhotoIndex === displayedPhotos.length - 1 && hasMorePhotos) {
            // Move to the next photo once new photos are loaded
            setSelectedPhotoIndex(selectedPhotoIndex + 1)
        }
    }, [displayedPhotos.length, selectedPhotoIndex, hasMorePhotos])

    // Preload next batch when approaching the end
    useEffect(() => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex >= displayedPhotos.length - 3 && hasMorePhotos) {
            loadMorePhotos()
        }
    }, [selectedPhotoIndex, displayedPhotos.length, hasMorePhotos, loadMorePhotos])

    return (
        <PageContainer title="Photography">
            {/* Filter buttons */}
            <div className="mb-8 overflow-x-auto pb-2">
                <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by country">
                    {uniqueCountries.map((country) => (
                        <button
                            key={country}
                            onClick={() => setFilter(country)}
                            aria-pressed={filter === country}
                            className={`px-3 py-1.5 rounded-full text-sm font-sans whitespace-nowrap transition-colors duration-200 ${
                                filter === country
                                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            {country}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPhotos.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No photos found for {filter}</p>
                    <button
                        onClick={() => setFilter("All")}
                        className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors font-sans text-sm"
                    >
                        Show all photos
                    </button>
                </div>
            ) : isChangingCountry ? (
                <div role="status" aria-busy="true" aria-label="Loading photos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                        <div key={i}>
                            <div className={`rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse ${
                                i % 3 === 0 ? 'h-64' : i % 3 === 1 ? 'h-48' : 'h-56'
                            }`}/>
                        </div>
                    ))}
                    <span className="sr-only">Loading photos...</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedPhotos.map((photo, index) => (
                            <div key={photo.url}>
                                <PhotoDetail
                                    isOpen={selectedPhotoIndex === index}
                                    onOpenChange={(open) => {
                                        setSelectedPhotoIndex(open ? index : null)
                                    }}
                                    type="image"
                                    url={photo.url}
                                    title={photo.title}
                                    onNext={handleNext}
                                    onPrevious={handlePrevious}
                                    preloadedImage={
                                        <Image
                                            src={photo.url}
                                            alt={photo.title || ""}
                                            width={800}
                                            height={800}
                                            className="h-full w-auto object-contain transform-gpu"
                                            loading="lazy"
                                            sizes="100vw"
                                        />
                                    }
                                    trigger={
                                        <button
                                            type="button"
                                            aria-label={`View photo: ${photo.title}`}
                                            className="relative group cursor-pointer overflow-hidden rounded-xl animate-fade-in-up w-full text-left aspect-[3/4]"
                                            style={{animationDelay: `${Math.min((index % BATCH_SIZE) * 0.1, 0.5)}s`}}
                                        >
                                            {index < 2 ? (
                                                <Image
                                                    src={photo.url.replace('.webp', '-thumb.webp')}
                                                    alt={photo.title || ""}
                                                    width={800}
                                                    height={600}
                                                    priority
                                                    fetchPriority="high"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <DeferredImage
                                                    src={photo.url.replace('.webp', '-thumb.webp')}
                                                    alt={photo.title || ""}
                                                    width={800}
                                                    height={600}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    placeholderClassName="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"
                                                />
                                            )}
                                            <div
                                                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity duration-300"/>
                                            <div
                                                className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                                <p className="text-sm font-medium truncate font-sans">{photo.title}</p>
                                                <p className="text-xs mt-1 truncate font-sans">{photo.city}, {photo.country}</p>
                                            </div>
                                        </button>
                                    }
                                >
                                    {photo.title}
                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  ({photo.city}, {photo.country})
                </span>
                                </PhotoDetail>
                            </div>
                        ))}
                    </div>

                    {hasMorePhotos && (
                        <div
                            ref={observerTarget}
                            className="h-20 w-full flex items-center justify-center mt-8"
                            style={{visibility: isLoading ? 'visible' : 'hidden'}}
                        >
                            {isLoading && (
                                <div
                                    className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800 dark:border-gray-200"/>
                            )}
                        </div>
                    )}
                </>
            )}
        </PageContainer>
    )
}

export default function PhotographyPage() {
    return <PhotographyContent/>
}
