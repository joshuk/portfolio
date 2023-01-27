<template>
  <section class="articleHero">
    <div class="articleHero__container">
      <img :src="article.image || article.image_large" class="articleHero__image" aria-hidden="true"/>

      <div class="articleHero__content">
        <p v-if="article.category" class="articleHero__category"><span>{{ article.category }}</span></p>
        <h1 class="articleHero__title"><span>{{ article.title }}</span></h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArticleHero',
  props: {
    article: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.articleHero {
  padding-top: 147px;
  padding-bottom: 0;

  &__container {
    position: relative;
    aspect-ratio: 2 / 1;
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &__category {
    margin-bottom: 0.625rem;
    line-height: 1.25;

    span {
      display: inline-block;
      padding: 0.75rem;
      background: var(--main-colour);
      color: #FBFBFB;
      font-weight: 800;
    }
  }

  &__title {
    margin: 0;
  }
}


@media screen and (max-width: 700px) {
  .articleHero {
    &__category {
      margin-bottom: 1rem;
    }
  }
}


@media screen and (max-width: 500px) {
  .articleHero {
    &__container {
      aspect-ratio: 3 / 2;
    }

    &__image {
      top: 0;
      width: calc(100% - 2rem);
      transform: translateX(-50%);
    }

    &__content {
      top: 100%;
      transform: translateY(-100%);
    }

    &__title {
      font-size: 2rem;
    }
  }
}
</style>