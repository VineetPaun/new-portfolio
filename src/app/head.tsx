export default function Head() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/HankenGrotesk-Variable.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/HankenGrotesk-Italic-Variable.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://github-contributions-api.deno.dev"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://cdn.hashnode.com" crossOrigin="anonymous" />
    </>
  );
}
