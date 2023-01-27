<template>
  <NuxtPage />
</template>

<style lang="scss">
/*! minireset.css v0.0.4 | MIT License | github.com/jgthms/minireset.css */
html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}img,embed,iframe,object,video{height:auto;max-width:100%}audio{max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}

html,
body,
#__nuxt {
  height: 100%;
}

/*
 * Colours
 */
@mixin lightModeColours {
  --light-colour: #FFFFFF;
  --light-shadow: #DADADA;
  --main-colour: #FF47A3;
  --dark-colour: #1B264F;
  --dark-shadow: #020510;

  --github-colour: #333;
  --codepen-colour: #000;

  --code-scrollbar-background: #DADADA;
  --code-scrollbar-thumb: #415392;
}

@mixin darkModeColours {
  --light-colour: #1B264F;
  --light-shadow: #415392;
  --main-colour: #FF47A3;
  --dark-colour: #D4D9E6;
  --dark-shadow: #B2BFE2;

  --github-colour: #FFF;
  --codepen-colour: #FFF;
  
  --code-scrollbar-background: #415392;
  --code-scrollbar-thumb: #DADADA;
}

html {
  background: var(--light-colour);
  color: var(--dark-colour);
  font-family: 'Raleway', 'Arial', sans-serif;
  scroll-behavior: smooth;

  &.light,
  &.default:not(.light, .dark) {
    @include lightModeColours();
  }

  &.dark {
    @include darkModeColours();
  }

  @media (prefers-color-scheme: dark) {
    &.default:not(.light, .dark) {
      @include darkModeColours();
    }
  }
}

/*
 * Global styles
 */
p,
li {
  margin-bottom: 0.875rem;
  font-size: 1.25rem;
  line-height: 1.75;
}

p:last-child {
  margin: 0;
}

a {
  color: var(--main-colour);
  font-weight: 500;

  &:hover {
    text-decoration: none;
  }
}

section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  width: 100%;
  color: var(--main-colour);
  font-weight: 600;
  line-height: 1;

  span {
    display: inline;
    background: var(--main-colour);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    color: #FBFBFB;
    font-weight: 800;
    line-height: 2;
  }
}

h1 {
  margin-bottom: 2.25rem;
  font-size: 3.5rem;

  span {
    padding: 1rem;
  }
}

h2 {
  margin-bottom: 2.25rem;
  font-size: 2.5rem;

  span {
    padding: 1rem;
  }
}

h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;

  span {
    padding: 0.75rem;
  }
}

h4 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}


@media screen and (max-width: 950px) {
  h1 {
    margin-bottom: 2rem;
    font-size: 3.25rem;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 2.25rem;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }
}

@media screen and (max-width: 700px) {
  p,
  li {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }

  section {
    padding: 2rem 1rem;
  }

  h1 {
    margin-bottom: 1.5rem;
    font-size: 2.5rem;

    span {
      line-height: 1.75;
    }
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
  }

  h4 {
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
}


/*
 * Keyframes
 */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes top-fade-in {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes bottom-fade-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes bottom-in {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>