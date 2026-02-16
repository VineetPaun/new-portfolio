import { about } from '@/config/About';
import { heroConfig } from '@/config/Hero';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(120deg, rgb(10, 10, 10) 0%, rgb(32, 32, 32) 45%, rgb(8, 97, 193) 100%)',
          color: 'white',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            opacity: 0.9,
          }}
        >
          {about.name}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              maxWidth: 1020,
              fontWeight: 700,
            }}
          >
            {heroConfig.title}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              maxWidth: 1020,
              opacity: 0.9,
            }}
          >
            {about.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
