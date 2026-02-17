import { about } from '@/config/About';
import { heroConfig } from '@/config/Hero';
import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at top right, rgb(8, 97, 193), rgb(10, 10, 10) 60%)',
          color: 'white',
          padding: '72px',
          fontFamily: 'sans-serif',
          gap: '28px',
        }}
      >
        <div
          style={{
            fontSize: 34,
            opacity: 0.9,
          }}
        >
          {about.name}
        </div>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {heroConfig.title}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
