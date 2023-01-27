I created my portfolio website around June 2020 to house both my work as a developer as well as any other little things that I wanted to show off or talk about.

It's built as a static [Jekyll](https://jekyllrb.com/) site and is hosted on [Netlify](https://www.netlify.com/), using [Forestry](https://forestry.io/) for content population.

<h3><span>the design</span></h3>

I had a few main things in mind when I thought about how I wanted this site to look.

* I wanted it to be minimal
* I wanted it to have a fairly basic colour scheme
* I wanted it to have a big focus on typography

<h4>Minimality</h4>

My main motivation behind making the site minimal was that it was going to be holding text and not much else, so I didn't want to take much focus off of that with fancy layouts or flashy animations (at least not on the content pages).

Another benefit of minimalism is that it makes it really easy to make tight. I like to think that this site is built pretty well and looks good on most devices and screen sizes, which was made much easier by not having a million moving parts.

<h4>Colours</h4>

The colour scheme was largely inspired by a website I worked on at a previous job (which never ended up seeing the light of day, so it's mine for the taking 😊).

The original colour scheme I chose used two light colours, a main colour (pink), and two dark colours.

<figure>  
<img src="/assets/img/colours_original.png" alt="An image showing the original colour scheme of Josh.ee"/>  
<figcaption>The original colour scheme of Josh.ee</figcaption>  
</figure>

My original plan was to pick out the colours for both the default light theme and a dark theme from that palette. However, that idea ended up being a bit naff in practice, so I instead opted for two slightly different colour schemes for both light and dark.

<figure><img src="/assets/img/colours_comp.png" alt="An image showing the two current of Josh.ee"/><figcaption>The (current) light and dark colour schemes of Josh.ee</figcaption></figure>

This ended up working a lot better.

<h4>Typography</h4>

Since the main purpose of this site is to house text, I knew that I had to try to make the typography as nice as possible.

I started with finding a clean, readable font that I liked the look of (and was free, of course). This ended up being [Raleway](https://fonts.google.com/specimen/Raleway).

In order to make my longer articles of text easier to read, I decided to use a kinda large font size, increase the line-height to stop everything being squished together, and limit the width of the actual article so that it didn't span the whole page.

In addition, while writing I would use line breaks and paragraphs fairly liberally, mainly to try and prevent huge walls of text that are impossible to read.

<h3><span>the build</span></h3>

When I was first thinking about how to build this site I considered a few different options.

Originally I was going to build it as a regular PHP site using a CMS like [Wordpress](https://wordpress.com/) or [CraftCMS](https://craftcms.com/), since I had a fair bit of experience building these kinds of things before.

However, not only would this mean I'd have to set up back end hosting which I couldn't be bothered doing, but I kinda wanted to try something new. So I canned that idea.

<br>

Next up I considered trying to use one of those fancy JS libraries like [React](https://reactjs.org/) or [Vue](https://vuejs.org/), since I'd never really touched one before and they were all the rage.

Though after a bit of research I realised that I'd not only have to set up a back end for these libraries to query, but _then_ actually write an API handler to get the information and display it. This sounded like entirely too much work.

Not only that, but importing a JS library (and subsequently forcing uses to have JS on) for a site that had nearly no interaction or moving parts doesn't really make much sense in my eyes. Maybe next time.

<br>

I finally landed on using a static site generator, since it didn't require me to set up a back end and spat out plain ol' static HTML files (which meant I could also host it for free 🤑).

I forget how exactly I stumbled on static site generators, most likely through a post/comment on the [webdev subreddit](https://old.reddit.com/r/webdev/). I also don't remember why I chose to use [Jekyll](https://jekyllrb.com/) over others, though in retrospect I would probably use something like [Hugo](https://gohugo.io/) or [11ty](https://www.11ty.dev/) just for faster builds.

_(Note to self: maybe don't wait a year before writing about what you made next time)_

<h4>Actually building it</h4>

Since this site is so basic in terms of it's content, I could really focus in on trying to make the site as fast and lightweight as possible as well as supporting a few settings I perhaps wouldn't bother with normally.

A few examples of this would be:

* Lazy-loading all of the videos on the site, whilst also including a regular version in a &lt;noscript&gt; tag for users with JS turned off.
* Using a media property when importing certain styles to only load animations for users on a device with a mouse cursor and _prefers-reduced-motion_ set to _no-preference_
* Automatically switching the site to dark mode for users with _prefers-color-scheme_ set to _dark_ (I'll go into this a bit more in a sec)

As well as this, thanks to some handy minification and compression, the initial load of the site's homepage doesn't go too far over 200kb. Meaning that regardless of whatever terrible internet connection you may be using, you should still be able to load the site fine (hopefully) (maybe).

<br>

At the time of building this site I had been developing sites for the NHS for a few years. This meant I had plenty of experience with developing for everyone's _best pal_ Internet Explorer, since apparently it's the browser of choice for many in that organisation.

Unfortunately I don't particularly like Internet Explorer, and so decided to employ some wishful thinking and essentially forget it existed when building this site.

The main place that this came in handy was with implementing the aforementioned colour schemes into the site. Due to not having to worry about compatibility, I could use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for all of the colours on the site. This made implementing a dark mode a walk in the park.

<figure><img src="/assets/img/light_dark_home.png" alt="An image showing the header of the homepage of Josh.ee, with the light theme on the left and the dark theme on the right."/><figcaption>Josh.ee in both light and dark mode</figcaption></figure>

Speaking of which...

<h3><span>dark mode</span></h3>

Since it's pretty much the only moving part of this site it'd probably be worth talking about how this works.

Like I mentioned before, I start by defining a couple of CSS variables which will hold the site's colours. Namely they are:

_light-colour_, _light-shadow_, _main-colour_, _dark-colour_, _dark-shadow_ along with a few others for social links.

These names were defined with the light scheme in mind, as that was the colour scheme I initially built the site in. This meant that _light-colour_ would be _#FFFFFF_, _light-shadow_ would be _#DADADA_ and so on.

To switch the site to the dark scheme, I can then just swap around all the variables but the main colour. So _light-colour_ would switch from being the lightest colour to the darkest, _dark-colour_ would become the lightest and so on.

This makes for some kinda funky reading if you look at Inspect Element while in dark mode, however it works well enough that I don't 
really care.

<figure><img src="/assets/img/inspect_element_colours.png" alt="An image showing the dark theme of the site in inspect element, with each variable being set to it's opposite colour."/><figcaption>Makes sense</figcaption></figure>

Next was actually allowing the user to switch between the modes.

<h4>Without Javascript</h4>

When you load the site the &lt;body&gt; has the class _default_ applied to it. This class defines all the aforementioned variables as the light scheme at first, however this is overwritten with the dark scheme's colours if the _prefers-color-scheme_ media query is set to _dark_.

This works pretty great in terms of it keeping the colour scheme that the user has set on their system, but makes it impossible (or at least a massive ball ache) to switch from one scheme to another.

<h4>With Javascript</h4>

To try and fix this problem, I could make a quick little Javascript switch that would swap the current colour scheme and save it in the user's cookies.

The main issue I faced when it came to this was setting the correct colour scheme when the user loaded a new page.

Since the site has no back end, I couldn't just add the correct class to the body there and have it render to the user's browser fine.

Similarly, trying to add this logic in an external &lt;script&gt; tag would mean the class would be added _after_ the page load, which could cause a pretty ugly flash in some circumstances. I don't want to cause any seizures, so I needed to find a fix for this.

Luckily, there is a pretty simple solution for this. By placing this little bit of JS directly after the opening &lt;body&gt; tag:

{% highlight javascript %}
const cookies = decodeURIComponent(document.cookie);
const index = cookies.indexOf('darkMode');

if(index !== -1){
  document.querySelector('body').classList.remove('default');
  document.querySelector('body').classList.add(['light', 'dark'][cookies.substr(index+9, 1)]);
}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){
  document.querySelector('body').classList.add('dark');
}
{% endhighlight %}

I can block the rendering of the page until the correct class is added to the body, and therefore the right colour scheme is rendered. Usually render blocking is [something that you would aim to avoid](https://web.dev/render-blocking-resources/), however in this situation it is exactly what I need.

<br>

For what it's worth, the script above basically checks whether the user's preference is already saved in their cookies. If it is, it removes the default class from the body and applies the correct class for what the user saved. 

Otherwise, it checks whether the user's device is already set to dark mode, then adds the _dark_ class to the &lt;body&gt; if it is. This isn't to show the correct colour scheme (the CSS will already handle that), but is to make it so that if/when the user presses the switch it will work properly.

<br>

After this, all that's needed is a button that the user can click to switch between light and dark mode. The code for this is relatively simple, though there are a couple of small quirks to note:

{% highlight javascript %}
document.querySelector('.colour-scheme-switch').addEventListener('click', () => {
    let classes = ['light', 'dark'];
    let value = (1 - document.querySelectorAll('body.dark').length);
    document.cookie = 'darkMode=' + value + ';path=/;';

    document.querySelector('body').classList.add('transition');
    setTimeout(() => {
        document.querySelector('body').classList.remove('transition');
    }, 500);

    document.querySelector('body').classList.remove(classes[1 - value]);
    document.querySelector('body').classList.add(classes[value]);
});
{% endhighlight %}

Firstly, the way that I determine the _darkMode_ cookie's value is more complicated than it looks.

Since the value of the cookie is binary (the site is either in dark mode or it isn't) I can just check whether the &lt;body&gt; tag has the class _dark_. If it does the length of the _querySelector_ will be 1, otherwise it will be 0. I can then subtract that value from 1 to get the opposite value.

<br>

I then have to add then remove the _transition_ class on the body to allow for a smooth transition between colour schemes. This class only contains one CSS definition:

{% highlight css %}
body.transition { transition: background 0.5s, color 0.5s; }
{% endhighlight %}

Which was originally added onto the body by default. However, I guess due to the different rendering engine treating the render blocking Javascript differently, this would cause the page to flash each time it loaded on Firefox.

Instead, adding this style to it's own class and then adding/removing said class when needed was an easy fix that worked all around.

<br>

Finally, I just add/remove the applicable classes to change the site's colour theme and hey presto the colour scheme has been swapped.

<h3><span>the future</span></h3>

This site is something that I always plan to keep iterating on as time goes on (so any part of this article may be incorrect/invalid at the time that you're reading it).

However, as of this article being written (July 2021, only over a year since I actually made the site 🤦‍♂️) everything here is near enough correct.

Thanks for reading.