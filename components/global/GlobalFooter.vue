<template>
  <footer class="globalFooter">
    <p class="globalFooter__socialsHeader">Get in touch:</p>

    <GlobalSocials class="globalFooter__socials"/>
    
    <p>&copy; Josh.ee 2023</p>
  </footer>
</template>

<script>
export default {
  name: 'GlobalFooter'
}
</script>

<style lang="scss">
.globalFooter {
  max-width: 75rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--light-shadow);

  &__socialsHeader {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  &__socials {
    margin-bottom: 1.5rem;
  }
}


@media screen and (max-width: 700px) {
  .globalFooter {
    padding: 1rem;
  }
}
</style>