<template>
  <div class="globalSocials">
    <a
      href="https://www.instagram.com/jo.sh.ee/"
      class="globalSocials__icon globalSocials__icon--instagram"
      target="blank"
      rel="noreferrer noopener"
      aria-label="Visit my Instagram">
      <BaseInstagramIcon />
    </a>
    <a
      href="https://github.com/joshuk"
      class="globalSocials__icon globalSocials__icon--github"
      target="blank"
      rel="noreferrer noopener"
      aria-label="Visit my Github">
      <IconGithub />
    </a>
    <a
      href="https://gitlab.com/joshuk"
      class="globalSocials__icon globalSocials__icon--gitlab"
      target="blank"
      rel="noreferrer noopener"
      aria-label="Visit my Gitlab">
      <IconGitlab />
    </a>
    <a
      href="https://codepen.io/joshuk"
      class="globalSocials__icon globalSocials__icon--codepen"
      target="blank"
      rel="noreferrer noopener"
      aria-label="Visit my Codepen">
      <IconCodepen />
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
  display: flex;

  &__icon {
    display: flex;

    &:not(:last-child) {
      margin-right: 12px;
    }

    svg {
      width: 32px;
      height: 32px;
      fill: var(--light-shadow);
      transition: fill 0.5s;
    }

    &--github:hover svg,
    &--github:focus svg {
      fill: var(--github-colour);
    }

    &--gitlab {
      path {
        transition: fill 0.5s;
      }

      &:not(:hover, :focus) path {
        fill: var(--light-shadow);
      }
    }

    &--codepen:hover svg,
    &--codepen:focus svg {
      fill: var(--codepen-colour);
    }
  }
}
</style>