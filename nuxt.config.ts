import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
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
