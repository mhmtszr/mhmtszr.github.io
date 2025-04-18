"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PhotoDetail } from "@/components/ui/photo-detail"

// Photography data with actual photos
const photos = [
  {
      url: '/photography/london.jpg',
      title: 'London, United Kingdom'
  },
  {
      url: '/photography/bigben.jpg',
      title: 'Big Ben, London'
  },
  {
      url: '/photography/bigben2.jpg',
      title: 'Big Ben, London'
  },
  {
      url: '/photography/bigben3.jpg',
      title: 'Big Ben, London'
  },
  {
      url: '/photography/bankstation.jpg',
      title: 'Bank Station, London'
  },
  {
      url: '/photography/bloomberg.jpg',
      title: 'Bloomberg Office, London'
  },
  {
      url: '/photography/towerbridge.jpg',
      title: 'Tower Bridge, London'
  },
  {
      url: '/photography/londoneye.jpg',
      title: 'London Eye, London'
  },
  {
      url: '/photography/hogwarts.jpg',
      title: 'Hogwarts'
  },
  {
      url: '/photography/edinburgh.jpg',
      title: 'Edinburgh, Scotland'
  },
  {
      url: '/photography/newtontree.jpg',
      title: 'Cambridge, United Kingdom'
  },
  {
      url: '/photography/cambridgecollege.jpg',
      title: 'Cambridge, United Kingdom'
  },
  {
      url: '/photography/phuket.jpg',
      title: 'Phuket, Thailand'
  },
  {
      url: '/photography/james_bond_island.jpg',
      title: 'James Bond Island'
  },
  {
      url: '/photography/panyee.jpg',
      title: 'Panye Island'
  },
  {
      url: '/photography/maya_bay.jpg',
      title: 'Maya Bay'
  },
  {
      url: '/photography/bangkok.jpg',
      title: 'Chao Phraya River, Bangkok'
  },
  {
      url: '/photography/bangkok_2.jpg',
      title: 'Lumphini Park, Bangkok'
  },
  {
      url: '/photography/bangkok_3.jpg',
      title: 'Temple of the Golden Buddha, Bangkok'
  },
  {
      url: '/photography/budva.jpg',
      title: 'Dancing Girl, Budva'
  },
  {
      url: '/photography/sveti_stefan.jpg',
      title: 'Sveti Stefan, Budva'
  },
  {
      url: '/photography/kotor.jpg',
      title: 'Kotor Castle'
  },
  {
      url: '/photography/perast.jpg',
      title: 'Perast'
  },
  {
      url: '/photography/perast_2.jpg',
      title: 'Perast'
  },
  {
      url: '/photography/novi_sad.jpg',
      title: 'The Name of Mary Church, Novi Sad'
  },
  {
      url: '/photography/belgrade_2.jpg',
      title: 'St. Mark\'s Church, Belgrade'
  },
  {
      url: '/photography/belgrade.jpg',
      title: 'The Belgrade Fortress'
  },
  {
      url: '/photography/havana.jpg',
      title: 'National Capitol of Cuba, Havana'
  },
  {
      url: '/photography/kübaatatürk.jpg',
      title: 'Atatürk Statue, Havana'
  },
  {
      url: '/photography/varadero.jpg',
      title: 'North Atlantic Ocean, Varadero'
  },
  {
      url: '/photography/trinidad.jpg',
      title: 'Romance Museum, Trinidad'
  },
  {
      url: '/photography/vinales.jpg',
      title: 'Vinales'
  },
  {
      url: '/photography/barcelona2.jpg',
      title: 'Tibidabo Amusement Park, Barcelona'
  },
  {
      url: '/photography/roma.jpg',
      title: 'Altare della Patria, Rome'
  },
  {
      url: '/photography/paris.jpg',
      title: 'Eiffel Tower, Paris'
  },
  {
      url: '/photography/madrid.jpg',
      title: 'Santiago Bernabéu Stadium, Madrid'
  },
  {
      url: '/photography/barcelona.jpg',
      title: 'La Font Magica, Barcelona'
  },
  {
      url: '/photography/prag.jpg',
      title: 'Dancing House, Prague'
  },
  {
      url: '/photography/venice.jpg',
      title: 'Venice'
  },
  {
      url: '/photography/paris2.jpg',
      title: 'Louvre Museum, Paris'
  },
  {
      url: '/photography/florence.jpg',
      title: 'Ponte Vecchio, Florence'
  },
  {
      url: '/photography/munich.jpg',
      title: 'Marienplatz, Munich'
  },
  {
      url: '/photography/brussels.jpg',
      title: '2018 FIFA World Cup Belgium - Brazil'
  },
  {
      url: '/photography/amsterdam.jpg',
      title: 'One of many channels, Amsterdam'
  },
  {
      url: '/photography/berlin.jpg',
      title: 'Reichstag Building, Berlin'
  },
  {
      url: '/photography/hardrockprag.jpg',
      title: 'Hard Rock Cafe in Prague'
  },
  {
      url: '/photography/pisa.jpg',
      title: 'Leaning Tower of Pisa'
  },
  {
      url: '/photography/barcelonaview.jpg',
      title: 'Park Guell, Barcelona'
  },
  {
      url: '/photography/el_retiro.jpg',
      title: 'El Retiro Park, Madrid'
  },
  {
      url: '/photography/familia.jpg',
      title: 'La Sagrada Familia, Barcelona'
  },
  {
      url: '/photography/romatrevi.jpg',
      title: 'Fontana di Trevi, Roma'
  },
  {
      url: '/photography/mostar.jpg',
      title: 'Old Bridge Mostar'
  },
  {
      url: '/photography/alperenler_tekkesi.jpg',
      title: 'Blagaj tekija, Mostar'
  },
  {
      url: '/photography/saraybosna.jpg',
      title: 'Sarajevo'
  },
  {
      url: '/photography/eskişehir.jpg',
      title: 'Odunpazarı houses, Eskisehir'
  },
  {
      url: '/photography/izmir.jpg',
      title: 'Bostanlı, Izmır'
  },
  {
      url: '/photography/alanya.jpg',
      title: 'Alanya'
  },
  {
      url: '/photography/hacettepe.jpg',
      title: 'Hacettepe University Green Valley, Ankara'
  },
  {
      url: '/photography/büyükada.jpg',
      title: 'Büyükada, Istanbul'
  },
  {
      url: '/photography/karabük.jpg',
      title: 'A beautiful frame that I caught on a long journey with our bikes, Karabük'
  },
  {
      url: '/photography/izmirbisiklet.jpg',
      title: 'A moment from our bike tour, Izmır'
  },
  {
      url: '/photography/kapadokya.jpg',
      title: 'Kapadokya, Nevşehir'
  },
  {
      url: '/photography/adrasan.jpg',
      title: 'Adrasan Beach, Antalya'
  },
  {
      url: '/photography/adrasan2.jpg',
      title: 'Adrasan Beach, Antalya'
  },
  {
      url: '/photography/cengelköy.jpg',
      title: 'Cengelköy, Istanbul'
  },
  {
      url: '/photography/antalya.jpg',
      title: 'Boğazkent, Antalya'
  },
  {
      url: '/photography/asansör.jpg',
      title: 'Tarihi Asansör, Izmir'
  },
  {
      url: '/photography/bolu.jpg',
      title: 'Yedigöller National Park, Bolu'
  },
  {
      url: '/photography/expo2016.jpg',
      title: 'Expo 2016, Antalya'
  },
  {
      url: '/photography/ilgaz.jpg',
      title: 'Ilgaz Mountain National Park, Kastamonu'
  },
  {
      url: '/photography/istanbulboat.jpg',
      title: 'Boat Tour, Istanbul'
  },
  {
      url: '/photography/safari.jpg',
      title: 'Serik, Safari Tour, Antalya'
  },
  {
      url: '/photography/eskisehir2.jpg',
      title: 'Sehr-i Ask Adasi, Eskisehir'
  },
  {
      url: '/photography/kapulukaya.jpg',
      title: 'Kapulukaya Baraji, Kirikkale'
  },
  {
      url: '/photography/heybeliada.jpg',
      title: 'Heybeliada, Istanbul'
  },
  {
      url: '/photography/kas.jpg',
      title: 'Kaş, Antalya'
  },
  {
      url: '/photography/kekova.jpg',
      title: 'Kekova, Batık Şehir, Antalya'
  },
  {
      url: '/photography/erfelek_1.jpg',
      title: 'Erfelek Tatlica Falls, Sinop'
  },
  {
      url: '/photography/erfelek_2.jpg',
      title: 'Erfelek Tatlica Falls, Sinop'
  }
]; 

export default function PhotographyPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedPhotoIndex(
          selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1
        )
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedPhotoIndex(
          selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1
        )
      }
    }

    if (selectedPhotoIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhotoIndex])

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedPhotoIndex === null) return
    setSelectedPhotoIndex(
      selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1
    )
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedPhotoIndex === null) return
    setSelectedPhotoIndex(
      selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1
    )
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Photography</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
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
              trigger={
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{photo.title}</p>
                  </div>
                </motion.div>
              }
            >
              {photo.title}
            </PhotoDetail>
          ))}
        </div>
      </div>
    </section>
  )
}
