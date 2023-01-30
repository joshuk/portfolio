<template>
  <header class="globalHeader">
    <NuxtLink href="/" class="globalHeader__logo" :class="{ 'globalHeader__logo--hidden': $route.name === 'index' }">JOSH</NuxtLink>

    <nav class="globalHeader__nav">
      <NuxtLink href="/#about" class="globalHeader__navLink">about</NuxtLink>
      <NuxtLink href="/#work" class="globalHeader__navLink">work</NuxtLink>
      <NuxtLink href="/#other" class="globalHeader__navLink">other</NuxtLink>

      <button class="globalHeader__toggleDarkMode" @click="switchColourScheme">
        <IconDarkMode />
      </button>
    </nav>
  </header>
</template>

<script>
import IconDarkMode from '@/assets/svg/dark-mode-icon.svg'

export default {
  name: 'GlobalHeader',
  components: {
    IconDarkMode
  },
  methods: {
    switchColourScheme() {
      let currentColourScheme = localStorage.theme

      // If there isn't a theme set, figure it out from the user's preferred colour scheme
      if (!currentColourScheme) {
        currentColourScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      // Set the new colour scheme to the opposite of that
      const newColourScheme = currentColourScheme === 'dark' ? 'light' : 'dark'

      // Now update the classes on the HTML element, along with localStorage
      document.documentElement.classList.add('isSwitchingThemes')

      document.documentElement.classList.remove(currentColourScheme)
      document.documentElement.classList.add(newColourScheme)

      localStorage.theme = newColourScheme

      // Then just remove the transition class once everything's finished
      setTimeout(() => {
        document.documentElement.classList.remove('isSwitchingThemes')
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.globalHeader {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 2.5rem;

  &__logo {
    position: relative;
    display: inline;
    padding: .75rem;
    background: var(--main-colour);
    color: #fbfbfb;
    font-weight: 800;
    text-decoration: none;
    z-index: 1000;

    &--hidden {
      opacity: 0;
    }
  }

  &__nav {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 100%;
    padding: 2rem 2.5rem;
    align-items: center;
    // animation: fade-in 1s;
    // animation-delay: 2s;
    // animation-fill-mode: forwards;
    justify-content: flex-end;
    // opacity: 0;
    z-index: 999;
  }

  &__navLink {
    display: inline-block;
    padding: 0 0.5rem;
    color: var(--main-colour);
    font-weight: 600;
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.5s;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__toggleDarkMode {
    width: 15px;
    height: 15px;
    margin: 0 0 0 0.375rem;
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.5s;

    &:hover {
      opacity: 1;
    }

    svg {
      fill: var(--dark-colour);
    }
  }
}


@media screen and (max-width: 700px) {
  .globalHeader {
    padding: 1.75rem 1.25rem;
    
    &__nav {
      padding: 1.75rem 1.25rem;
    }
  }
}
</style>