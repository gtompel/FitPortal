import nextPWA from 'next-pwa'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/placeholder.svg',
        search: '*',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
}

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Кэширование API запросов с network-first стратегией
    {
      urlPattern: /^https?.*\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
    // Исключение кэширования для аутентификационных эндпоинтов
    {
      urlPattern: /^https?.*\/api\/auth\/.*/,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'auth-cache',
      },
    },
    // Кэширование статических ресурсов с cache-first стратегией
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|eot)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Кэширование изображений с stale-while-revalidate стратегией
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Кэширование шрифтов с stale-while-revalidate стратегией
    {
      urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'fonts',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
  // Исключения для кэширования
  publicExcludes: ['!sw.js', '!workbox-*.js', '!custom-sw.js'],
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/],
  // Исключение кэширования для медиа-сегментов
})

export default withPWA(nextConfig)
