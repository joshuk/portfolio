<script setup>
  import anime from 'animejs/lib/anime.es.js'

  definePageMeta({
    pageTransition: {
      name: 'indexPage',
      mode: 'out-in',
      onEnter: async (el, done) => {
        const mainContent = el.querySelector('main')

        const animation = anime({
          targets: mainContent,
          opacity: [0, 1],
          duration: 500,
          endDelay: 250,
          easing: 'easeInOutQuad'
        })

        await animation.finished
        document.documentElement.removeAttribute('style')

        done()
      },
      onLeave: async (el, done) => {
        document.documentElement.style.scrollBehavior = 'unset'
        
        const animation = anime({
          targets: el,
          opacity: 0,
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
  <div class="indexPage">
    <GlobalHeader />

    <HomepageHero />

    <main>
      <HomepageAbout />
      <HomepageWork />
      <HomepageOther />
    </main>

    <GlobalFooter />
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss">
.indexPage {
  height: 100%;
}
</style>