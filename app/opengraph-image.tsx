import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const revalidate = false

export const alt = 'Mehmet Sezer - Senior Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundImage: 'url(https://msezer.dev/opengraph-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Semi-transparent overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            position: 'relative',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Mehmet Sezer
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#f0f0f0',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            Senior Software Engineer
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#e0e0e0',
              textAlign: 'center',
              maxWidth: '80%',
              lineHeight: 1.4,
            }}
          >
            Specializing in distributed systems and database internals
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 