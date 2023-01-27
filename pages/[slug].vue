<script setup>
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
</script>

<template>
  <GlobalHeader />

  <main>
    <ArticleHero :article="article" />

    <ArticleContent>
      <ContentDoc />
    </ArticleContent>
  </main>

  <GlobalFooter />
</template>

<script>
export default {
  name: 'SlugPage'
}
</script>

<style lang="scss">

</style>