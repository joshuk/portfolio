<template>
  <article class="articleContent">
    <slot />
  </article>
</template>

<script>
export default {
  name: 'ArticleContent'
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