<template>
  <section class="homepageWork" id="work">
    <h2><span>my work</span></h2>
    <p class="homepageWork__subtitle">Here are some things that I've worked on:</p>

    <template v-for="(post, key) of work" :key="key">
      <div v-if="post.isPublished || isDevEnvironment" class="homepageWork__item">
        <div class="homepageWork__itemImage">
          <img :src="post.image" aria-hidden="true">
        </div>
        <div class="homepageWork__itemDescription">
          <h3><span>{{ post.title }}</span>{{ !post.isPublished ? ' 🫥' : '' }}</h3>
          <p class="homepageWork__itemExcerpt">{{ post.description }}</p>
          <p class="homepageWork__itemCreation">Created in {{ post.date }}</p>
          <NuxtLink :to="`/${key}`" class="homepageWork__itemLink">read about {{ post.title.toLowerCase() }}</NuxtLink>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'HomepageWork',
  async setup() {
    const work = await import('@/src/work.json')

    return {
      work: work.default,
      isDevEnvironment: process.dev 
    }
  }
}
</script>

<style lang="scss">
.homepageWork {
  &__subtitle {
    margin-bottom: 2rem;
  }

  &__item {
    display: flex;
    width: calc(100% + 0.5rem);
    margin: 0 -0.5rem 3rem;
    align-items: center;

    &:nth-of-type(2n-1) {
      &:hover {
        .homepageWork__itemImage {
          transform: translateX(0);
        }

        .homepageWork__itemDescription {
          transform: translateX(-1rem);
        }
      }

      .homepageWork__itemImage {
        transform: translateX(0.5rem);
      }

      .homepageWork__itemDescription {
        transform: translateX(-1.5rem);
      }
    }

    &:nth-of-type(2n) {
      flex-direction: row-reverse;

      &:hover {
        .homepageWork__itemImage {
          transform: translateX(0);
        }

        .homepageWork__itemDescription {
          transform: translateX(1rem);
        }
      }

      .homepageWork__itemImage {
        transform: translateX(-0.5rem);
      }

      .homepageWork__itemDescription {
        justify-content: flex-end;
        text-align: right;
        transform: translateX(1.5rem);
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    > div {
      transition: transform 0.5s;
    }
  }

  &__itemImage {
    width: calc(50% + 0.5rem);
    aspect-ratio: 16 / 9;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__itemDescription {
    display: flex;
    padding: 1rem;
    align-items: center;
    background: var(--light-colour);
    flex: 1;
    flex-wrap: wrap;
  }

  &__itemExcerpt {
    font-size: 1rem;
  }

  &__itemCreation {
    width: 100%;
    margin: -6px 0 10px;
    font-size: 1rem;
  }

  &__itemLink {
    color: var(--main-colour);
    font-weight: 600;
    text-decoration: none;
  }
}


@media screen and (max-width: 950px) {
  .homepageWork {
    &__subtitle {
      margin-bottom: 1.25rem;
    }

    &__itemExcerpt,
    &__itemCreation,
    &__itemLink {
      font-size: 0.875rem;
    }
  }
}


@media screen and (max-width: 700px) {
  .homepageWork {
    &__item {
      width: 100%;
      margin: 0 0 3rem;
      flex-wrap: wrap;
    }

    &__itemImage {
      width: 100%;
      transform: translate(0) !important;
    }

    &__itemDescription {
      padding: 1rem 0;
      transform: translate(0) !important;
    }
  }
}
</style>