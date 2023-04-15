<script setup>
  import anime from 'animejs/lib/anime.es.js'

  // So we need to find the information for this page
  // So let's start by importing the articles from their respective JSON files
  const workArticles = await import('@/src/work.json')
  const otherArticles = await import('@/src/other.json')

  const articles = {
    ...workArticles.default,
    ...otherArticles.default
  }

  const route = useRoute()

  // Now let's find the article content
  const article = articles[route.params.slug]

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }

  // Now just to figure out which type of article this is
  article.category = Object.keys(workArticles.default).includes(route.params.slug) ? 'work' : 'other'

  // We can also set the page's head from this
  useHead({
    title: `Josh.ee - ${article.title}`
  })

  // Now let's define the transition
  definePageMeta({
    pageTransition: {
      name: 'index-transition',
      mode: 'out-in',
      appear: true,
      onEnter: async (el, done) => {
        const header = el.querySelector('.globalHeader')
        const articleImage = el.querySelector('.articleHero__image')
        const articleHeaders = el.querySelectorAll('.articleHero__content > *')

        const articleContentItems = el.querySelectorAll('.articleContent > div > *:not(br)')

        // Let's detect which one of these are actually visible, so we can just animate those in
        const visibleContentItems = []

        Array.from(articleContentItems).forEach((element) => {
          if (element.offsetTop < window.innerHeight) {
            visibleContentItems.push(element)

            return
          }

          element.classList.add('invisible')
          element.style.opacity = 0
        })

        const tl = anime.timeline()

        tl.add({
          targets: header,
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutQuad'
        })

        tl.add({
          targets: articleImage,
          opacity: [0, 1],
          duration: 500,
          easing: 'easeInOutQuad'
        }, '-=250')

        tl.add({
          targets: articleHeaders,
          opacity: [0, 1],
          translateX: [-24, 0],
          duration: 500,
          delay: anime.stagger(100),
          easing: 'easeOutCubic'
        }, '-=350')

        tl.add({
          targets: visibleContentItems,
          opacity: [0, 1],
          translateX: [24, 0],
          duration: 500,
          delay: anime.stagger(100),
          easing: 'easeOutQuad'
        }, '-=250')

        await tl.finished

        document.documentElement.removeAttribute('style')
        done()
      },
      onLeave: async (el, done) => {
        document.documentElement.style.scrollBehavior = 'unset'

        const headerLogo = el.querySelector('.globalHeader__logo')
        const articleContent = el.querySelector('main')

        const animation = anime({
          targets: [headerLogo, articleContent],
          opacity: [1, 0],
          duration: 300,
          endDelay: 250,
          easing: 'easeInOutQuad'
        })

        await animation.finished

        done()
      }
    }
  })
</script>

<template>
  <div class="slugPage">
    <GlobalHeader />

    <main>
      <ArticleHero :article="article" />

      <ArticleContent>
        <ContentDoc :head="false" />
      </ArticleContent>
    </main>

    <GlobalFooter />
  </div>
</template>

<script>
export default {
  name: 'SlugPage',
  mounted() {
    // To stop an annoying little flash when the user transitions to another page,
    // we need to set the opacity as an inline style here after the page loads
    requestAnimationFrame(() => {
      const headerLogo = this.$el.querySelector('.globalHeader__logo')

      headerLogo.style.opacity = 1
    })
  }
}
</script>

<style lang="scss">

</style>