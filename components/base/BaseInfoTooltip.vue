<template>
  <span class="baseInfoTooltip" :class="{ 'active': isActive }">
    <span class="baseInfoTooltip__label" :aria-describedby="ariaId"><slot name="label" /></span>

    <span role="tooltip" :id="ariaId" class="baseInfoTooltip__tooltip"><slot name="tooltip" /></span>
  </span>
</template>

<script>
export default {
  name: 'BaseInfoTooltip',
  props: {
    ariaId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.$el.addEventListener('focus', this.toggleActive)
    this.$el.addEventListener('focusout', this.toggleActive)

    this.$el.addEventListener('mousemove', this.updateMouseCoords)
  },
  methods: {
    toggleActive() {
      this.$el.removeAttribute('style')
      this.isActive = !this.isActive
    },
    updateMouseCoords(e) {
      const xOffset = -(this.$el.offsetWidth / 2) + e.offsetX
      const yOffset = e.offsetY - 6

      this.$el.setAttribute('style', `--offsetX: calc(-50% + ${xOffset}px); --offsetY: calc(-100% + ${yOffset}px);`)
    }
  }
}
</script>

<style lang="scss">
.baseInfoTooltip {
  --offsetX: -50%;
  --offsetY: calc(-100% - 6px);

  position: relative;
  display: inline-block;

  &.active,
  &:hover {
    .baseInfoTooltip__label {
      text-decoration-color: var(--main-colour);
    }

    .baseInfoTooltip__tooltip {
      opacity: 1;
    }
  }

  &__label {
    cursor: help;
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: 2px;
    text-decoration-color: rgb(255 71 163 / 70%);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s;
  }

  &__tooltip {
    position: absolute;
    top: 0;
    left: 50%;
    padding: 1px 6px;
    background: var(--main-colour);
    color: #FBFBFB;
    font-size: 13px;
    font-weight: 500;
    opacity: 0;
    pointer-events: none;
    transform: translate(var(--offsetX), var(--offsetY));
    transition: opacity 0.2s;
    white-space: nowrap;

    &:after {
      content: '';
      position: absolute;
      bottom: 1px;
      left: 50%;
      border: 7px solid transparent;
      border-top: 7px solid var(--main-colour);
      transform: translate(-50%, 100%);
    }
  }
}
</style>