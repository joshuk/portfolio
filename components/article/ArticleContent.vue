<template>
  <article class="articleContent">
    <slot />
  </article>
</template>

<script>
import throttle from 'lodash.throttle'
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'ArticleContent',
  mounted() {
    let functionDelay = 0

    // This may seem a bit strange, but promise there's method in the madness.
    // If the page is transitioning in, this component is mounted but not actually rendered.
    // This means that none of the code below really works and it just fucks everything up.
    // Since there's no way to detect when this component is RENDERED that I can find, we
    // can detect whether it is using this. If this returns > 0, it's actually rendered
    // on the page and we don't need to delay anything. If it doesn't, we need to delay the
    // code below to only run once the page is actually rendered in the user's browser.
    if (!this.$el.offsetTop) {
      functionDelay = 600
    }

    setTimeout(() => {
      const articleElements = this.$el.querySelectorAll('div > *:not(br, .invisible)')
      const bottomOfScreen = window.scrollY + window.innerHeight

      Array.from(articleElements).forEach((element) => {
        if (element.offsetTop > bottomOfScreen) {
          element.style.opacity = 0
          element.classList.add('invisible')
        }
      })

      window.addEventListener('scroll', this.onScrollEvent())
    }, functionDelay)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScrollEvent())
  },
  methods: {
    onScrollEvent() {
      // I use a generator here in order to remove the event when the component is unmounted.
      // The EXACT same function must be passed on the removeEventListener as the add.
      return throttle(this.fadeInVisibleText, 200)
    },
    fadeInVisibleText() {
      const articleElements = this.$el.querySelectorAll('.invisible')
      const inViewElements = []

      const bottomOfScreen = window.scrollY + window.innerHeight

      Array.from(articleElements).forEach((element) => {
        if (element.offsetTop < bottomOfScreen) {
          element.classList.remove('invisible')
          inViewElements.push(element)
        }
      })

      anime({
        targets: inViewElements,
        opacity: [0, 1],
        translateX: [24, 0],
        duration: 300,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
      })
    }
  }
}
</script>

<style lang="scss">
.articleContent {
  max-width: 52rem;
  margin: 5rem auto 0;
  padding: 0 1rem;

  p,
  ul,
  ol {
    + h3 {
      margin-top: 3rem;
    }

    + h4 {
      margin-top: 2rem;
    }
  }

  strong {
    font-weight: 600;
  }

  ul {
    padding-left: 1.5rem;

    li {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -1.5rem;
        top: 13px;
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        background: var(--main-colour);
      }
    }
  }

  ol {
    padding-left: 1.5rem;
    counter-reset: ordered-list;
    list-style: none;

    li {
      position: relative;
      
      &:before {
        content: counter(ordered-list) '.';
        position: absolute;
        left: -1.5rem;
        color: var(--main-colour);
        counter-increment: ordered-list;
        font-weight: 500;
      }
    }
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid var(--light-shadow);
  }

  figure {
    margin: 2rem 0;

    figcaption {
      max-width: 37.5rem;
      font-style: italic;
      font-size: 0.875rem;
      line-height: 1.3;
    }
  }

  code {
    display: block;
    max-height: 50rem;
    margin: 2rem 0;
    padding: 0.5rem 0.75rem;
    background: #181d31;
    font-size: 0.875rem;
    line-height: 1.75;
    overflow: auto;

    &::-webkit-scrollbar {
      max-width: 6px;
      max-height: 6px;
      background: var(--code-scrollbar-background);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--code-scrollbar-thumb);
    }

    &::-webkit-scrollbar-corner {
      background: var(--light-colour);
    }
  }

  video {
    margin: 1rem 0 2rem;
  }
}

@media screen and (max-width: 700px) {
  .articleContent {
    margin-top: 3rem;

    code {
      max-height: 35rem;
      margin: 1rem 0;
      font-size: 0.75rem;
    }

    ul {
      padding-left: 1rem;

      li {
        &:before {
          top: 11px;
          left: -1rem;
          width: 6px;
          height: 6px;          
        }
      }
    }

    ol {
      padding-left: 1rem;

      li {
        &:before {
          left: -1rem;
          font-weight: 400;
        }
      }
    }
  }
}


@media screen and (max-width: 500px) {
  .articleContent {
    margin-top: 3.5rem;

    p {
      + h3 {
        margin-top: 2rem;
      }

      + h4 {
        margin-top: 1.5rem;
      }
    }

    video {
      margin: 0 0 1rem;
    }

    figure {
      margin: 1rem 0;
    }
  }
}
</style>