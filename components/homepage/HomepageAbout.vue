<template>
  <section class="homepageAbout" id="about">
    <h2><span>about me</span></h2>

    <p>Hiya! 👋</p>
    <p>
      My name's Josh, I'm a 24 year old web developer
      from&nbsp;<BaseInfoTooltip ariaId="locationTooltip" tabindex="0">
        <template #label>Manchester, UK</template>
        <template #tooltip>i'm actually from bolton 🤫</template>
      </BaseInfoTooltip>
      🐝
    </p>
    <p>
      I've been programming for over 10 years, the
      <BaseInfoTooltip ariaId="workTimeTooltip" tabindex="0">
        <template #label>last 5-ish of those</template>
        <template #tooltip>october 2017 - march 2023</template>
      </BaseInfoTooltip>
      working full time as a web developer.
    </p>
    <p>
      I've got
      <BaseInfoTooltip ariaId="experienceTooltip" tabindex="0">
        <template #label>tons of experience</template>
        <template #tooltip>march 2014 - present</template>
      </BaseInfoTooltip>
      with HTML, CSS, PHP and Javascript
      (inc. jQuery, Vue and Node)
      and I'm always up for a new challenge!</p>
    <p>
      Outside of that you can usually find me
      <BaseInfoTooltip ariaId="gamesTooltip" tabindex="0">
        <template #label>playing video games</template>
        <template #tooltip>🥰 🐒🎯🎈</template>
      </BaseInfoTooltip>,
      <BaseInfoTooltip ariaId="musicTooltip" tabindex="0">
        <template #label>listening to music</template>
        <template #tooltip>41,000+ mins in 2022 🎧</template>
      </BaseInfoTooltip>
      or&nbsp;<BaseInfoTooltip ariaId="travelTooltip" tabindex="0">
        <template #label>travelling abroad</template>
        <template #tooltip>check out my instagram 📸🌄</template>
      </BaseInfoTooltip>.
    </p>

    <p class="homepageAbout__socialsHeader">Check me out:</p>
    <GlobalSocials class="homepageAbout__socials" />
  </section>
</template>

<script>
export default {
  name: 'HomepageAbout'
}
</script>

<style lang="scss">
.homepageAbout {
  &__socialsHeader {
    margin: 1.75rem 0 0.5rem;
    color: var(--light-shadow);
  }
}
</style>