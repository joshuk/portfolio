<template>
  <div class="globalSocials">
    <a href="https://www.instagram.com/jo.sh.ee/" target="blank" rel="noreferrer noopener">
      <BaseInstagramIcon class="globalSocials__icon globalSocials__icon--instagram" />
    </a>
    <a href="https://github.com/joshuk" target="blank" rel="noreferrer noopener">
      <IconGithub class="globalSocials__icon globalSocials__icon--github" />
    </a>
    <a href="https://gitlab.com/joshuk" target="blank" rel="noreferrer noopener">
      <IconGitlab class="globalSocials__icon globalSocials__icon--gitlab" />
    </a>
    <a href="https://codepen.io/joshuk" target="blank" rel="noreferrer noopener">
      <IconCodepen class="globalSocials__icon globalSocials__icon--codepen" />
    </a>
  </div>  
</template>

<script>
import IconGithub from '@/assets/svg/github-icon.svg'
import IconGitlab from '@/assets/svg/gitlab-icon.svg'
import IconCodepen from '@/assets/svg/codepen-icon.svg'

export default {
  name: 'GlobalSocials',
  components: {
    IconGithub,
    IconGitlab,
    IconCodepen
  }
}
</script>

<style lang="scss">
.globalSocials {
  &__icon {
    width: 32px;
    margin-right: 12px;
    fill: var(--light-shadow);
    transition: fill 0.5s;

    &--github:hover {
      fill: var(--github-colour);
    }

    &--gitlab {
      path {
        transition: fill 0.5s;
      }

      &:not(:hover) path {
        fill: var(--light-shadow);
      }
    }

    &--codepen:hover {
      fill: var(--codepen-colour);
    }
  }
}
</style>