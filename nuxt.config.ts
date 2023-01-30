import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Josh.ee - Web Developer based in Manchester, UK',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/images/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/images/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;800&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `
            if (localStorage.theme) {
              document.documentElement.classList.add(localStorage.theme)
            }
          `
        }
      ],
      htmlAttrs: {
        class: 'default'
      }
    }
  },

  modules: [
    '@nuxt/content'
  ],

  content: {
    highlight: {
      theme: 'monokai',
      preload: [
        'css', 'javascript'
      ]
    }
  },

  vite: {
    plugins: [svgLoader()],
    assetsInclude: ['**/*.md']
  }
})
