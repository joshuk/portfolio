<template>
  <section class="homepageOther" id="other">
    <h2><span>other stuff</span></h2>
    <p class="homepageOther__subtitle">Here's some other stuff that I wanna talk about:</p>

    <div class="homepageOther__articles">
      <template v-for="(post, key) of articles" :key="key">
        <div v-if="post.isPublished || isDevEnvironment" class="homepageOther__item">
          <div class="homepageOther__itemImage">
            <img :src="post.image_small" aria-hidden="true">
          </div>
          <div class="homepageOther__itemDescription">
            <h3 class="homepageOther__itemTitle"><span>{{ post.title }}</span>{{ !post.isPublished ? ' 🫥' : '' }}</h3>
            <p class="homepageOther__itemExcerpt">{{ post.description }}</p>
            <p v-if="post.subtitle" class="homepageOther__itemCreation">{{ post.subtitle }}</p>
            <NuxtLink :to="`/${key}`" class="homepageOther__itemLink">read about {{ post.title.toLowerCase() }}</NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomepageOther',
  async setup() {
    const articles = await import('@/src/other.json')

    return {
      articles: articles.default,
      isDevEnvironment: process.dev 
    }
  }
}
</script>

<style lang="scss">
.homepageOther {
  &__subtitle {
    margin-bottom: 2rem;
  }

  &__articles {
    display: flex;
    width: 100%;
    margin: 0 -1.5rem -1.5rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__item {
    position: relative;
    display: flex;
    width: 33.33%;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    align-items: flex-start;
    flex-wrap: wrap;

    & > div {
      transition: transform 0.5s;
    }

    &:hover {
      .homepageOther__itemImage {
        transform: translate(0, 0);
      }

      .homepageOther__itemDescription {
        transform: translate(0, 0);
      }
    }
  }

  &__itemImage {
    width: 75%;
    aspect-ratio: 1 / 1;
    transform: translate(0.5rem, 0.5rem);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__itemDescription {
    position: relative;
    width: 75%;
    margin: -33% 0 0 25%;
    padding: 1rem;
    background: var(--light-colour);
    transform: translate(-0.5rem, -0.5rem);
  }

  &__itemTitle {
    margin-bottom: 0.875rem;
    padding: 4px 0;
    font-size: 1.125rem;
  }

  &__itemExcerpt {
    margin-bottom: 6px;
    font-size: 0.875rem;
  }

  &__itemCreation {
    font-size: 0.875rem;
    margin-bottom: 8px;
  }

  &__itemLink {
    color: var(--main-colour);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
  }
}


@media screen and (max-width: 950px) {
  .homepageOther {
    &__subtitle {
      margin-bottom: 1.25rem;
    }
  }
}


@media screen and (max-width: 700px) {
  .homepageOther {
    &__articles {
      margin: 0 -1rem -1rem;
    }

    &__item {
      width: 100%;
      margin-bottom: 1rem;
    }

    &__itemImage {
      width: 50%;
      transform: translate(0) !important;
    }

    &__itemDescription {
      margin: -25% 0 0 25%;
      transform: translate(0) !important;
    }
  }
}
</style>