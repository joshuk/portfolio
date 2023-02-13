At the start of this year I recreated my portfolio site (the one you're looking at now!) from using Jekyll to Nuxt 3.

<h3 id="why"><span>why?</span></h3>

Even from the beginning I had a couple of hang-ups with Jekyll as a piece of software, the biggest one being the speed (or lack thereof).

It would on occasion take upwards of 10 seconds to update once I made a small change, and take well over a minute to do a complete build of the site.

While this wasn't a _huge_ issue, it was enough to put me off developing with it.

The straw that broke the camel's back, however, was when I tried to reinstall the site recently to make some changes only to be greeted with errors telling me that certain packages couldn't be used with the version of Ruby I had installed.

After spending a little while trying to update the packages, downgrade Ruby and generally troubleshoot these issues I essentially gave up and decided to move to something I knew was more reliable.

<h3 id="why-nuxt"><span>why nuxt?</span></h3>

I originally started using Nuxt while working at [Supremo](https://www.supremo.co.uk/){:target="_blank"} and quickly fell in love with it.

Due to it using [Vue](https://vuejs.org/){:target="_blank"} as it's backbone, it makes development really simple while remaining super powerful using syntax that I'm very familiar with.

In addition to this, Nuxt 3 is integrated with [Vite](https://vitejs.dev/){:target="_blank"} which allows for super quick hot reloads (often within 50ms of updating) and _much_ faster builds.

<h3 id="whats-changed"><span>so what's changed?</span></h3>

In all honestly, not a lot.

I still quite like the choices I made when [originally designing ths site](https://www.josh.ee/josh-ee#design){:target="_blank"}, so have no real desire to change any of it.

However, there are a couple of small things to touch on:

<h4 id="animations">Animations</h4>

When I built this site for the first time, I took a bit of a no nonsense approach to things like animations. Which essentially meant there weren't that many.

However, as time's gone on I've started to realize that (when implemented properly) some animation can add a nice final touch to an otherwise quite plain website.

Speaking of which:

<h4 id="transitions">Transitions</h4>

One thing that makes Nuxt really cool is that it supports [Vue transitions](https://nuxt.com/docs/getting-started/transitions){:target="_blank"} out of the box.

Then what makes it cooler is that because Nuxt uses Vue components as the backbone for everything (including pages), you can really easily add in nice transitions without having to mess about with packages like [barba.js](https://barba.js.org/){:target="_blank"}.

<h4 id="dark-mode">Dark Mode</h4>

So practically the dark mode hasn't changed from [how it was before](https://www.josh.ee/josh-ee#dark-mode){:target="_blank"}. The main thing that's changed is the code behind it.

Back in 2020 I thought I was really clever writing [these bits of JS](https://www.josh.ee/josh-ee#dark-mode-js){:target="_blank"} that reused variables to try and reduce the number of lines.

When I looked back on this in 2023, I realized that all I really did was write needlessly confusing code for no real reason.

For comparison, here's the original code that I wrote for the colour switcher up in the nav:

```javascript
  let classes = ['light', 'dark'];
  let value = (1 - document.querySelectorAll('body.dark').length);
  document.cookie = 'darkMode=' + value + ';path=/;';

  document.querySelector('body').classList.add('transition');
  setTimeout(() => {
      document.querySelector('body').classList.remove('transition');
  }, 500);

  document.querySelector('body').classList.remove(classes[1 - value]);
  document.querySelector('body').classList.add(classes[value]);
```

Compare this to what it's using now:

```javascript
let currentColourScheme = localStorage.theme

// If there isn't a theme set, figure it out from the user's preferred colour scheme
if (!currentColourScheme) {
  currentColourScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Set the new colour scheme to the opposite of that
const newColourScheme = currentColourScheme === 'dark' ? 'light' : 'dark'

// Now update the classes on the HTML element, along with localStorage
document.documentElement.classList.add('isSwitchingThemes')

document.documentElement.classList.remove(currentColourScheme)
document.documentElement.classList.add(newColourScheme)

// Update local storage
localStorage.theme = newColourScheme

// Then just remove the transition class once everything's finished
setTimeout(() => {
  document.documentElement.classList.remove('isSwitchingThemes')
}, 500)
```

So while we are using more lines now, I think that (even without the comments) the updated code is much easier to understand.

<hr>

That's about everything of note that's changed.

If you're interested in seeing the code that this website is using, you can [check it out on Github](https://github.com/joshuk/portfolio){:target="_blank"}!