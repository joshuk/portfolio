<template>
  <div class="homepageHero">
    <div class="homepageHero__content">
      <div class="homepageHero__nameHolder" aria-label="Hi, my name is Josh">
        <span class="homepageHero__nameSubtitle" aria-hidden="true">
          <span>Hi,&nbsp;</span>
          <span>my&nbsp;</span>
          <span>name&nbsp;</span>
          <span>is</span>
        </span>

        <h1 class="homepageHero__name" aria-hidden="true">
          <span>J</span>
          <span>o</span>
          <span>s</span>
          <span>h</span>
        </h1>
      </div>
      
      <p class="homepageHero__title">I make websites and stuff</p>
      <p class="homepageHero__subtitle">Web Developer based in Manchester, UK</p>
    </div>

    <a href="#about" class="homepageHero__scrollToContent" title="Scroll to content"></a>
  </div>
</template>

<script>
export default {
  name: 'HomepageHero'
}
</script>

<style lang="scss">
.homepageHero {
  position: relative;
  display: flex;
  height: 100%;
  max-height: 75vw;
  align-items: center;
  justify-content: center;

  &__content {
    padding: 0 1rem;
    text-align: center;
  }

  &__nameHolder {
    position: relative;
    display: inline-block;
    margin: 0 auto 2rem;
    padding: 1rem 0 1rem 1.5rem;
    color: #fbfbfb;
    overflow: hidden;
    user-select: none;

    &:before {
      content: '';
      position: absolute;
      top: 115px;
      left: -125px;
      width: 105%;
      height: 255%;
      animation: expand 1.25s;
      background: var(--main-colour);
      transform-origin: top left;
      transform: rotate(-45deg);
    }
  }

  &__nameSubtitle {
    position: relative;
    display: block;
    margin-bottom: .5rem;
    padding-left: 6px;
    font-size: 1.25rem;
    letter-spacing: 1.69rem;
    text-transform: lowercase;

    span {
      position: relative;
      display: inline-block;
      animation: top-fade-in 0.5s;
      animation-fill-mode: forwards;
      opacity: 0;

      &:nth-child(1) {
        animation-delay: 0.1s;
      }
      
      &:nth-child(2) {
        animation-delay: 0.225s;
      }

      &:nth-child(3) {
        animation-delay: 0.35s;
      }

      &:nth-child(4) {
        animation-delay: 0.475s;
      }
    }
  }

  &__name {
    display: flex;
    margin: 0;
    padding: 0;
    color: #fbfbfb;
    font-weight: 800;
    font-size: 12rem;
    line-height: .8;
    overflow: hidden;
    text-transform: uppercase;

    span {
      position: relative;
      display: inline-block;
      padding: 0;
      animation: bottom-in 0.75s;
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.130, -0.060, 0.000, 1.190);
      background: 0 0;
      box-shadow: none;
      line-height: inherit;
      transform: translateY(-100%);

      &:nth-child(1) {
        animation-delay: 0.6s;
      }
    
      &:nth-child(2) {
        animation-delay: 0.7s;
      }
    
      &:nth-child(3) {
        animation-delay: 0.8s;
      }
    
      &:nth-child(4) {
        animation-delay: 0.9s;
      }
    }
  }

  &__title {
    margin-bottom: .875rem;
    animation: bottom-fade-in 1s;
    animation-delay: 1.5s;
    animation-fill-mode: forwards;
    font-size: 1.75rem;
    font-weight: 500;
    letter-spacing: .0625rem;
    opacity: 0;
  }

  &__subtitle {
    animation: bottom-fade-in 1.75s;
    animation-delay: 1.6s;
    animation-fill-mode: forwards;
    font-size: 16px;
    opacity: 0;
  }

  &__scrollToContent {
    position: absolute;
    bottom: 4rem;
    left: 50%;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    animation: fade-in 1s, bounce 5s infinite;
    animation-delay: 2s;
    animation-fill-mode: forwards;
    background: 0 0;
    border: none;
    border-bottom: 3px solid var(--main-colour);
    border-right: 3px solid var(--main-colour);
    cursor: pointer;
    opacity: 0;
    transform: translateX(-50%) rotate(45deg);
  }
}


@media screen and (max-width: 700px) {
  .homepageHero {
    max-height: 100vh;

    &__title {
      font-size: 1.375rem;
    }
  }
}


@media screen and (max-width: 600px) {
  .homepageHero {
    &__nameSubtitle {
      position: absolute;
      top: 12px;
      margin-bottom: 0.25rem;
      padding-left: 11px;
      font-size: 1rem;
      letter-spacing: 0.8125rem;
    }

    &__nameHolder {
      padding: 1rem 0.75rem 1rem 1rem;

      &:before {
        top: 65px;
        left: -85px;
      }
    }

    &__name {
      margin-top: 1.375rem;
      font-size: 7rem;
    }

    &__subtitle:last-child {
      max-width: 275px;
      margin: 0 auto;
    }

    &__scrollToContent {
      bottom: 3rem;
    }
  }
}


/*
 * Animations
 */
@keyframes bounce {
  40% { 
    transform: translateX(-50%) rotate(45deg);
  }
  44% {
    transform: translateX(-50%) translateY(1rem) rotate(45deg);
  }
  48% {
    transform: translateX(-50%) rotate(45deg);
  }
  52% {
    transform: translateX(-50%) translateY(1rem) rotate(45deg);
  }
  56% {  
    transform: translateX(-50%) rotate(45deg);
  }
}

@keyframes expand {
  from { transform: rotate(-45deg) scaleY(0); }
  to { transform: rotate(-45deg) scaleY(1); }
}
</style>