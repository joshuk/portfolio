[mono domains](https://mono.domains/){:target="_blank"} (or mono for short) is a domain search engine/price comparison site that I built during the month of March 2023.

The general idea behind mono is to provide the information of services such as [TLD-List](https://tld-list.com/){:target="_blank"}, with the UX and ease of use of something like [Domainr](https://domainr.com/){:target="_blank"}.

Behind the scenes, mono is made up of three main parts:
1. A scraping routine to fetch all the prices from each registrar, made in NodeJS
2. An API used to serve said pricing information aswell as search results, made in PHP
3. A front end used to show all that information to the user, made in Nuxt 3

Let's talk about each of those a little bit:

<h3 id="getting-pricing-info"><span>getting pricing info</span></h3>

The first task when it came to making this website was getting all of the pricing information for each extension on each registrar.

My original hope was that registrars would offer some sort of easy to use API to get all of their pricing information (naive, I know 😄).

Unsurprisingly most registrars didn't offer any API at all, and the ones that did included a lot of information that wasn't of particular interest to me.

So, without much messing about, I moved on to plan B.

#### Web Scraping

While I know web scraping can be a bit of a contentious topic, it was the second best option in my head as to how to solve this problem.

I started out writing a simple script using [Playwright](https://playwright.dev/){:target="_blank"} and [cheerio](https://cheerio.js.org/){:target="_blank"} that allowed me to scrape pricing from a single registrar and store it in a MySQL database.

Once that was all working fine I could just split out the scraping routine itself into its own class with consistent inputs and outputs, which then made it dead easy to incorporate similar routines for other registrars.

Before long I had a fully modular system that made adding new registrars as simple as writing a quick scraping script. Great!

<figure>  
<img src="/images/mono-domains/scraping_handlers.png" alt="A directory tree showing six scraping scripts used by mono."/>  
<figcaption>An example of six aforementioned scraping scripts</figcaption>  
</figure>

With that out of the way, we can move on to the next bit.

<h3 id="creating-an-api"><span>creating an api</span></h3>

As I briefly mentioned before, I was storing all the pricing information I was gathering in a MySQL database.

So now I had a table of a few thousand rows of pricing information that I had to deliver to the user, which meant I had to make some sort of API.

You might be wondering why I chose to use a MySQL database over something a bit better suited to Node (like MongoDB).

The answer is simple, it's because I was planning to build the API using everyone's favourite language...

<br>

✨PHP✨

<br>

Why PHP? Two main reasons:

- I hadn't done any real PHP development in a while, and as it was the first web language I learned I was missing it 😢
- Using PHP meant I could just use an out of the box [LAMP](https://www.digitalocean.com/community/tutorials/what-is-lamp){:target="_blank"}/[LEMP](https://www.digitalocean.com/community/tutorials/what-is-lemp){:target="_blank"} setup to host, rather than having to mess about getting something going myself

Since this API is dead simple, I didn't bother using any super fancy frameworks like Symfony or Laravel. It uses [this routing library](https://github.com/bramus/router){:target="_blank"} by [Bramus](https://github.com/bramus){:target="_blank"} as a backbone, then everything else is made in vanilla PHP.

<br>

With that out of the way, let's go through the three main functions of the API:

#### Pricing Information

This is probably the simplest of the three functions in that all it does is fetch information from the aforementioned database.

So, for example, if the user visits the */extension/.com* endpoint they'll be given all of the pricing information in the database relating to *.com*.

#### Whois Queries

One thing that mono does when you perform a search is it tells you whether or not a domain is available or not. The only concrete way to gather this information is by sending a request to the registry's whois server.

My original idea was to use a third party API to do this for me. However it was difficult to find one that wasn't either super limited or expensive, so I decided to make my own instead.

Luckily for me, a developer called [Sergey Sedyshev](https://github.com/io-developer){:target="_blank"} created an amazing [PHP Whois library](https://github.com/io-developer/php-whois){:target="_blank"} that basically takes care of everything.

The only real issue is that some of the more obscure extensions may have strict registrarion rules which result in whois query errors. However, that's nothing that a little error message can't solve.

<figure>  
<img src="/images/mono-domains/whois_query_failure.png" alt="A search for the domain 'an-example.zw' which returns the text 'hmm.. an-example.zw might be available'"/>  
<figcaption>.zw domains can only be registered under subdomains like .co.zw, so whois requests like this will consistently fail.</figcaption>  
</figure>

#### Domain hack searches

For those unaware, a domain hack is where you include the domain extension as part of the domain name that you want to register.

As an example, let's take the phrase 'cheapcars'. Two domain hacks for this phrase would be:

- cheap.cars - using the generic .cars domain extension
- cheapca.rs - using the Serbian .rs domain extension

<br>

I imagine there are several ways you can go about looking for domain hacks, however here's the process that mono uses. We'll use 'cheapcars' as an example again.

1. Get the last two letters of the search term (so 'rs' in this case)
2. Find all extensions in the database that also end in those letters (.builde**rs**, .ca**rs**, .flowe**rs**, .**rs** etc.)
3. Loop through the extensions returned from the database and exclude any that don't fit into the end of the search term, like below:

```php
foreach ($potentialExtensions as $extension) {
  $flattenedExtension = str_replace('.', '', $extension);

  $extensionPosition = strrpos($domain, $flattenedExtension);

  if ($extensionPosition !== false // If the extension is in the domain,
  && $extensionPosition > 0 // Isn't right at the start
  && $extensionPosition + strlen($flattenedExtension) === strlen($domain)) { // And is at the end
    $hackedDomain = substr($domain, 0, $extensionPosition);

    // If the resulting domain is invalid, we shouldn't add it to the results
    if (!$domainHelper->isValidDomain($hackedDomain)) {
      continue;
    }

    // Gather further information about extension, etc...
  }
}
```

This process will then leave us with the two extensions listed above, .cars and .rs.

It should be noted that doing the search this way excludes partial domain hacks (such as *cheap.ca*, which could then have a subdirectory to create *cheap.ca/rs*). However, since hacks like that are kinda confusing anyway, I don't think it's really that much of a loss.

<br>

There is a bit more that goes into the search than that, such as doing multiple passes and detecting included extensions, but that's the most complex part.

<figure>  
<img src="/images/mono-domains/cheap_cars_uk_search.png" alt="A search for the term 'cheapcars.uk' which returns 'cheapcars.uk', 'cheap.cars', 'cheapca.rs' and 'cheapcars.com'"/>  
<figcaption>An example search for the term 'cheapcars.uk', which highlights everything I've mentioned above.</figcaption>  
</figure>

And that's about it for the API 🎉 Let's move on to the front end.

<h3 id="the-front-end"><span>the front end</span></h3>

Before even starting to build mono, I had two things that I wanted to incorporate into the site:

1. I wanted the colour scheme to be mostly [monochromatic](https://en.wikipedia.org/wiki/Monochrome){:target="_blank"} (hence the name!)
2. I wanted to use the [geomanist](https://www.atipofoundry.com/fonts/geomanist){:target="_blank"} font from [atipo foundry](https://www.atipofoundry.com){:target="_blank"}, since I bought it a while ago and liked it.

With those things in mind (and no actual design or plan 😅) I set off building the front end.

<br>

I decided to go with ol' faithful [Nuxt](https://nuxt.com/){:target="_blank"} as the framework of the site, with the intention to generate it statically and host with something like [Netlify](https://www.netlify.com/){:target="_blank"}.

For styling, I opted to try out [Tailwind CSS](https://tailwindcss.com/){:target="_blank"} for this project since it was relatively simple and gave me a chance to dip my toes in. For what it's worth, I rather enjoyed using it and will probably use it again.

Finally, to give the site a bit more ✨pizazz✨ without any more actual effort I added [AutoAnimate](https://auto-animate.formkit.com/){:target="_blank"} into the mix, which is an awesome library that I definitely will be using again!

<br>

Since the front end is essentially just displaying the information sent from the API, which we've already talked about, there's not too much else to add here.

Let's talk about hosting.

<h3 id="hosting"><span>hosting</span></h3>

Since this is a full stack application let's split this up into two different sections to make things clearer.

#### Back end

As I mentioned earlier on, part of the reason that I chose to use PHP to build the API for mono is to make things easier when it came to setting up hosting.

I personally chose to use the LEMP stack simply due to having recent experience working with NGINX based servers.

From there setting up the API server was as simple as spinning up a VPS with [Vultr](https://www.vultr.com/){:target="_blank"} with their [one-click LEMP app](https://www.vultr.com/apps/lemp/){:target="_blank"}, then using git to transfer over the code.

<br>

Next up was setting up the scraping script.

Luckily, since this bit wasn't public facing I didn't have to make any special config changes in NGINX to get it working.

Instead I just installed NodeJS and npm using [nvm](https://github.com/nvm-sh/nvm){:target="_blank"}, installed the dependencies, linked up the database and hey presto we're scraping! 🪄

From there I put together a small bash script to run the scraper and log the output to a file:

```bash
#!/bin/bash

source ~/.nvm/nvm.sh && (node ~/mono-scraper/app.js >> /var/log/scraper/$(date +%Y%m%d-%H%M).log 2>&1)
```

And set up a cron job to run that script three times a day. Sorted!

#### Front end

Hey, remember how I said that I was going to host this using Netlify? Well, that didn't really pan out.

The issue came in that mono creates a new page for every extension that is in it's database (by design).

This sounds good, until you realize that for every full build of the site you're going to be generating 2,000+ pages.

<figure>  
<img src="/images/mono-domains/front_end_build_pages.png" alt="A snippet of the build output, listing 2,060 routes that need to be generated."/>  
<figcaption>Jinkies!</figcaption>  
</figure>

While this *would* still be possible using Netlify, what I found after some napkin maths is that doing so would basically eat up all of my build minutes every month.

This would mean my other sites (like this one!) wouldn't be able to be built at all, which simply wouldn't do.

So, after looking at Netlify's [premium pricing](https://www.netlify.com/pricing/){:target="_blank"}, I span up another LEMP VPS with Vultr to host the front end.

<br>

*"But Josh,"* you ask, *"If the site is generated statically, doesn't that mean that the information will be out of date once the scraping script runs again?"*

No! 😄

Originally, my plan to prevent this from happening was to generate a new [build hook](https://docs.netlify.com/configure-builds/build-hooks/){:target="_blank"} with Netlify and call it at the end of the scraping procedure.

However, with having to provision my own server I didn't have access to fancy stuff like that out of the box. So I went for the next best thing.

At the end of the scraping procedure on the back end server there's a small script that SSHs into the front end server, runs the front end build script, then peaces out.

```javascript
class FrontEndDeploymentHandler {
  async deployFrontEnd() {
    // Create a new connection to the FE server
    const ssh = new SSHConnection()
    const connection = await ssh.getConnection()

    // Run the build command
    const { stderr } = await connection.execCommand('source ~/.nvm/nvm.sh && npm run generate', {
      cwd: '/usr/share/nginx/html'
    })

    if (stderr && !stderr.startsWith('WARN')) {
      throw new Error(stderr)
    }

    // Disconnect
    connection.dispose()
  }
}
```

Boom! 💥 Problem solved.

<hr>

That's that really! There's still improvements to make to mono in the future, but I'm very happy with how this project has turned out so far.

If you wanna check out mono, you can find it at [mono.domains](https://mono.domains/){:target="_blank"}.

Thanks for reading! 👋