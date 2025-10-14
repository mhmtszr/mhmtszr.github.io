"use client"

import { useState, useEffect, useMemo, useRef, useCallback, Suspense } from "react"
import { motion } from "framer-motion"
import { PhotoDetail } from "@/components/ui/photo-detail"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { useSearchParams } from 'next/navigation'
import { PageContainer } from "../components/page-container"

// Photography data with actual photos
const photos = [
  {
    url: '/photography/london.jpg',
    title: 'London',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/bigben.jpg',
    title: 'Big Ben',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/bigben2.jpg',
    title: 'Big Ben',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/bigben3.jpg',
    title: 'Big Ben',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/bankstation.jpg',
    title: 'Bank Station',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/bloomberg.jpg',
    title: 'Bloomberg Office',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/towerbridge.jpg',
    title: 'Tower Bridge',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/londoneye.jpg',
    title: 'London Eye',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/hogwarts.jpg',
    title: 'Hogwarts',
    city: 'London',
    country: 'England'
  },
  {
    url: '/photography/edinburgh.jpg',
    title: 'Edinburgh',
    city: 'Edinburgh',
    country: 'Scotland'
  },
  {
    url: '/photography/newtontree.jpg',
    title: 'Newton Tree',
    city: 'Cambridge',
    country: 'England'
  },
  {
    url: '/photography/cambridgecollege.jpg',
    title: 'Cambridge College',
    city: 'Cambridge',
    country: 'England'
  },
  {
    url: '/photography/phuket.jpg',
    title: 'Phuket',
    city: 'Phuket',
    country: 'Thailand'
  },
  {
    url: '/photography/james_bond_island.jpg',
    title: 'James Bond Island',
    city: 'Phuket',
    country: 'Thailand'
  },
  {
    url: '/photography/panyee.jpg',
    title: 'Panye Island',
    city: 'Phuket',
    country: 'Thailand'
  },
  {
    url: '/photography/maya_bay.jpg',
    title: 'Maya Bay',
    city: 'Phuket',
    country: 'Thailand'
  },
  {
    url: '/photography/bangkok.jpg',
    title: 'Chao Phraya River',
    city: 'Bangkok',
    country: 'Thailand'
  },
  {
    url: '/photography/bangkok_2.jpg',
    title: 'Lumphini Park',
    city: 'Bangkok',
    country: 'Thailand'
  },
  {
    url: '/photography/bangkok_3.jpg',
    title: 'Temple of the Golden Buddha',
    city: 'Bangkok',
    country: 'Thailand'
  },
  {
    url: '/photography/havana.jpg',
    title: 'National Capitol of Cuba',
    city: 'Havana',
    country: 'Cuba'
  },
  {
    url: '/photography/kübaatatürk.jpg',
    title: 'Atatürk Statue',
    city: 'Havana',
    country: 'Cuba'
  },
  {
    url: '/photography/varadero.jpg',
    title: 'North Atlantic Ocean',
    city: 'Varadero',
    country: 'Cuba'
  },
  {
    url: '/photography/trinidad.jpg',
    title: 'Romance Museum',
    city: 'Trinidad',
    country: 'Cuba'
  },
  {
    url: '/photography/vinales.jpg',
    title: 'Vinales',
    city: 'Vinales',
    country: 'Cuba'
  },
  {
    url: '/photography/budva.jpg',
    title: 'Dancing Girl',
    city: 'Budva',
    country: 'Montenegro'
  },
  {
    url: '/photography/sveti_stefan.jpg',
    title: 'Sveti Stefan',
    city: 'Budva',
    country: 'Montenegro'
  },
  {
    url: '/photography/kotor.jpg',
    title: 'Kotor Castle',
    city: 'Kotor',
    country: 'Montenegro'
  },
  {
    url: '/photography/perast.jpg',
    title: 'Perast',
    city: 'Perast',
    country: 'Montenegro'
  },
  {
    url: '/photography/perast_2.jpg',
    title: 'Perast',
    city: 'Perast',
    country: 'Montenegro'
  },
  {
    url: '/photography/novi_sad.jpg',
    title: 'The Name of Mary Church',
    city: 'Novi Sad',
    country: 'Serbia'
  },
  {
    url: '/photography/belgrade_2.jpg',
    title: "St. Mark's Church",
    city: 'Belgrade',
    country: 'Serbia'
  },
  {
    url: '/photography/belgrade.jpg',
    title: 'The Belgrade Fortress',
    city: 'Belgrade',
    country: 'Serbia'
  },
  {
    url: '/photography/barcelona2.jpg',
    title: 'Tibidabo Amusement Park',
    city: 'Barcelona',
    country: 'Spain'
  },
  {
    url: '/photography/roma.jpg',
    title: 'Altare della Patria',
    city: 'Rome',
    country: 'Italy'
  },
  {
    url: '/photography/paris.jpg',
    title: 'Eiffel Tower',
    city: 'Paris',
    country: 'France'
  },
  {
    url: '/photography/madrid.jpg',
    title: 'Santiago Bernabéu Stadium',
    city: 'Madrid',
    country: 'Spain'
  },
  {
    url: '/photography/barcelona.jpg',
    title: 'La Font Magica',
    city: 'Barcelona',
    country: 'Spain'
  },
  {
    url: '/photography/prag.jpg',
    title: 'Dancing House',
    city: 'Prague',
    country: 'Czech Republic'
  },
  {
    url: '/photography/venice.jpg',
    title: 'Venice',
    city: 'Venice',
    country: 'Italy'
  },
  {
    url: '/photography/paris2.jpg',
    title: 'Louvre Museum',
    city: 'Paris',
    country: 'France'
  },
  {
    url: '/photography/florence.jpg',
    title: 'Ponte Vecchio',
    city: 'Florence',
    country: 'Italy'
  },
  {
    url: '/photography/munich.jpg',
    title: 'Marienplatz',
    city: 'Munich',
    country: 'Germany'
  },
  {
    url: '/photography/brussels.jpg',
    title: '2018 FIFA World Cup Belgium - Brazil',
    city: 'Brussels',
    country: 'Belgium'
  },
  {
    url: '/photography/amsterdam.jpg',
    title: 'One of many channels',
    city: 'Amsterdam',
    country: 'Netherlands'
  },
  {
    url: '/photography/berlin.jpg',
    title: 'Reichstag Building',
    city: 'Berlin',
    country: 'Germany'
  },
  {
    url: '/photography/hardrockprag.jpg',
    title: 'Hard Rock Cafe',
    city: 'Prague',
    country: 'Czech Republic'
  },
  {
    url: '/photography/pisa.jpg',
    title: 'Leaning Tower of Pisa',
    city: 'Pisa',
    country: 'Italy'
  },
  {
    url: '/photography/barcelonaview.jpg',
    title: 'Park Guell',
    city: 'Barcelona',
    country: 'Spain'
  },
  {
    url: '/photography/el_retiro.jpg',
    title: 'El Retiro Park',
    city: 'Madrid',
    country: 'Spain'
  },
  {
    url: '/photography/familia.jpg',
    title: 'La Sagrada Familia',
    city: 'Barcelona',
    country: 'Spain'
  },
  {
    url: '/photography/romatrevi.jpg',
    title: 'Fontana di Trevi',
    city: 'Rome',
    country: 'Italy'
  },
  {
    url: '/photography/mostar.jpg',
    title: 'Old Bridge',
    city: 'Mostar',
    country: 'Bosnia and Herzegovina'
  },
  {
    url: '/photography/alperenler_tekkesi.jpg',
    title: 'Blagaj tekija',
    city: 'Mostar',
    country: 'Bosnia and Herzegovina'
  },
  {
    url: '/photography/saraybosna.jpg',
    title: 'Sarajevo',
    city: 'Sarajevo',
    country: 'Bosnia and Herzegovina'
  },
  {
    url: '/photography/eskişehir.jpg',
    title: 'Odunpazarı houses',
    city: 'Eskisehir',
    country: 'Turkey'
  },
  {
    url: '/photography/izmir.jpg',
    title: 'Bostanlı',
    city: 'Izmir',
    country: 'Turkey'
  },
  {
    url: '/photography/alanya.jpg',
    title: 'Alanya',
    city: 'Alanya',
    country: 'Turkey'
  },
  {
    url: '/photography/hacettepe.jpg',
    title: 'Hacettepe University Green Valley',
    city: 'Ankara',
    country: 'Turkey'
  },
  {
    url: '/photography/büyükada.jpg',
    title: 'Büyükada',
    city: 'Istanbul',
    country: 'Turkey'
  },
  {
    url: '/photography/karabük.jpg',
    title: 'A beautiful frame that I caught on a long journey with our bikes',
    city: 'Karabük',
    country: 'Turkey'
  },
  {
    url: '/photography/izmirbisiklet.jpg',
    title: 'A moment from our bike tour',
    city: 'Izmir',
    country: 'Turkey'
  },
  {
    url: '/photography/kapadokya.jpg',
    title: 'Kapadokya',
    city: 'Nevşehir',
    country: 'Turkey'
  },
  {
    url: '/photography/adrasan.jpg',
    title: 'Adrasan Beach',
    city: 'Antalya',
    country: 'Turkey'
  },
  {
    url: '/photography/adrasan2.jpg',
    title: 'Adrasan Beach',
    city: 'Antalya',
    country: 'Turkey'
  },
  {
    url: '/photography/cengelköy.jpg',
    title: 'Cengelköy',
    city: 'Istanbul',
    country: 'Turkey'
  },
  {
    url: '/photography/antalya.jpg',
    title: 'Boğazkent',
    city: 'Antalya',
    country: 'Turkey'
  },
  {
    url: '/photography/asansör.jpg',
    title: 'Tarihi Asansör',
    city: 'Izmir',
    country: 'Turkey'
  },
  {
    url: '/photography/bolu.jpg',
    title: 'Yedigöller National Park',
    city: 'Bolu',
    country: 'Turkey'
  },
  {
    url: '/photography/expo2016.jpg',
    title: 'Expo 2016',
    city: 'Antalya',
    country: 'Turkey'
  },
  {
    url: '/photography/ilgaz.jpg',
    title: 'Ilgaz Mountain National Park',
    city: 'Kastamonu',
    country: 'Turkey'
  },
  {
    url: '/photography/istanbulboat.jpg',
    title: 'Boat Tour',
    city: 'Istanbul',
    country: 'Turkey'
  },
  {
    url: '/photography/safari.jpg',
    title: 'Safari Tour',
    city: 'Serik',
    country: 'Turkey'
  },
  {
    url: '/photography/eskisehir2.jpg',
    title: 'Sehr-i Ask Adasi',
    city: 'Eskisehir',
    country: 'Turkey'
  },
  {
    url: '/photography/kapulukaya.jpg',
    title: 'Kapulukaya Baraji',
    city: 'Kirikkale',
    country: 'Turkey'
  },
  {
    url: '/photography/heybeliada.jpg',
    title: 'Heybeliada',
    city: 'Istanbul',
    country: 'Turkey'
  },
  {
    url: '/photography/kas.jpg',
    title: 'Kaş',
    city: 'Antalya',
    country: 'Turkey'
  },
  {
    url: '/photography/kekova.jpg',
    title: 'Kekova, Batık Şehir',
    city: 'Antalya',
    country: 'Turkey'
  },
  {
    url: '/photography/erfelek_1.jpg',
    title: 'Erfelek Tatlica Falls',
    city: 'Sinop',
    country: 'Turkey'
  },
  {
    url: '/photography/erfelek_2.jpg',
    title: 'Erfelek Tatlica Falls',
    city: 'Sinop',
    country: 'Turkey'
  }
]; 

// Pre-compute unique countries
const uniqueCountries = ["All", ...Array.from(
  new Set(photos.map(photo => photo.country))
)]

const BATCH_SIZE = 12;

function PhotographyContent() {
  const searchParams = useSearchParams()
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")
  const [displayCount, setDisplayCount] = useState(BATCH_SIZE)
  const [isLoading, setIsLoading] = useState(false)
  const [isChangingCountry, setIsChangingCountry] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

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

  // Reset when filter changes
  useEffect(() => {
    setDisplayCount(BATCH_SIZE);
    setIsChangingCountry(true);
    
    const timer = setTimeout(() => {
      setIsChangingCountry(false);
    }, 300);

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
        <div className="flex gap-2 flex-wrap">
          {uniqueCountries.map((country) => (
            <button
              key={country}
              onClick={() => setFilter(country)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
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
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Show all photos
          </button>
        </div>
      ) : isChangingCountry ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-gray-200" />
            <p className="text-gray-600 dark:text-gray-400">Loading photos from {filter}...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPhotos.map((photo, index) => (
              <PhotoDetail
                key={photo.url}
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
                    priority={index < BATCH_SIZE}
                    sizes="100vw"
                  />
                }
                trigger={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: Math.min((index % BATCH_SIZE) * 0.1, 0.5) }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.title || ""}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 8}
                      loading={index >= 8 ? "lazy" : "eager"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-sm font-medium truncate">{photo.title}</p>
                      <p className="text-xs mt-1 truncate">{photo.city}, {photo.country}</p>
                    </div>
                  </motion.div>
                }
              >
                {photo.title}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  ({photo.city}, {photo.country})
                </span>
              </PhotoDetail>
            ))}
          </div>
          
          {hasMorePhotos && (
            <div 
              ref={observerTarget}
              className="h-20 w-full flex items-center justify-center mt-8"
              style={{ visibility: isLoading ? 'visible' : 'hidden' }}
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800 dark:border-gray-200" />
              )}
            </div>
          )}
        </>
      )}
    </PageContainer>
  )
}

export default function PhotographyPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-gray-200" />
            <p className="text-gray-600 dark:text-gray-400">Loading photos...</p>
          </div>
        </div>
      }
    >
      <PhotographyContent />
    </Suspense>
  )
}
