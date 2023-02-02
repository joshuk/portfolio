Taiko Cat is a dumb little web app I made over the course of a weekend in September 2018 that combines [Bongo Cat](https://knowyourmeme.com/memes/bongo-cat){:target="_blank"} and [osu!taiko](https://osu.ppy.sh/help/wiki/Game_Modes/osu%21taiko){:target="_blank"} maps.

<h3 id="what"><span>who with what?</span></h3>

Bongo Cat was a dumb little internet meme stemmed from [a series of tweets](https://twitter.com/DitzyFlama/status/993487015499853824){:target="_blank"} that went viral. Over the next couple of months this idea was picked up and used by [many different content creators](https://www.youtube.com/results?search_query=bongo+cat){:target="_blank"} resulting in millions of views.

One such place where it was picked up was within the osu! community, where someone went as far as [to build a pseudo-webcam featuring Bongo Cat](https://www.reddit.com/r/osugame/comments/9gah62/i_made_a_bongo_cat_cam_for_osu_that_works_in_real/){:target="_blank"} (which admittedly inspired me to create this). Speaking of which...

[osu!](https://osu.ppy.sh) is a PC game which includes several gamemodes based on already popular rhythm games alongside community created content. One such gamemode is [osu!taiko](https://osu.ppy.sh/help/wiki/Game_Modes/osu%21taiko){:target="_blank"} (or taiko for short) and is based on the [Taiko no Tatsujin](https://en.wikipedia.org/wiki/Taiko_no_Tatsujin){:target="_blank"} game series.

<br>

The basic idea behind Taiko Cat was that users could give the website a song to play from osu!'s library, and the Bongo Cat would play along with it on a Taiko drum.

Fairly simple, right? Well, not exactly.

<h3 id="execution"><span>the execution</span></h3>

I'd just like to preface this by saying that the general execution of this project is sloppy at best. While I still think it's pretty fun, under the surface it's anything but. 

However, it should be noted that the code was never intended to be built upon or worked on by others. It was made simply as a joke over a couple of days. That makes it okay to have messy code, right?

*...right?*

<br>

Regardless, the first hurdle was being able to read and parse the song from osu!, so let's start there.

<h3 id="reading-an-osz-file"><span>reading a .osz file</span></h3>

A .osz file is what the osu! website spits out when a user downloads a beatmap. Usually these are automatically opened by osu!, however that's not of much use to us right now.

The osu! website's documentation on the .osz filetype is [somewhat vague](https://osu.ppy.sh/help/wiki/osu!_File_Formats/Osz_(file_format)){:target="_blank"}, however it's noted elsewhere that it's just a .zip file with a different file extension.

This means that it can be read on the client-side using a library such as [JSZip](https://stuk.github.io/jszip/){:target="_blank"}.

<figure>
    <img src="/images/taiko-cat/example_beatmap_contents.png" alt="A screenshot of the contents of an example .osz file"/>
    <figcaption>The basic contents of a .osz file</figcaption>
</figure>

A .osz file basically contains everything about the beatmap. This includes things like the background, any video or storyboard elements etc. It also includes the two things we're interested in, the .mp3 and .osu file(s).

A .osu file contains all information about a specific difficulty of a beatmap. The above example beatmap only contains one difficulty, however others may contain several (such as Easy, Normal, Hard and so on). These files are the ones that are actually interesting.

<h3 id="parsing-an-osu-file"><span>parsing a .osu file</span></h3>

Luckily for me, .osu files are stored in plain text (so no weird decompression or libraries are needed). Doubly lucky for me, .osu files have [fantastic documentation](https://osu.ppy.sh/help/wiki/osu!_File_Formats/Osu_(file_format)){:target="_blank"} on the osu! website. *Triply* lucky for me, I can ignore most of this information as I have no use for it.

The only information that Taiko Cat needs to work is:

* The map's metadata
* The map's lead-in time (the number of milliseconds before the audio starts playing)
* The map's hitobjects

And to make it *even* sweeter, all I need from the map's hit objects is the time that they should play and the object type.

So, without further ado, let's get into some code! *(Warning: Spaghetti ahead!)*

```javascript
zip.forEach(function (p, f) {
  if(f.name.indexOf('.osu') != -1){
    f.async("string").then(function(c){
      if(c.indexOf('Mode: 1') != -1){
        hitObjects = c.split('[HitObjects]')[1].trim();

        artistName = (c.indexOf('ArtistUnicode:') != -1 ? /ArtistUnicode:(.+)/.exec(c)[1].trim() : /Artist:(.+)/.exec(c)[1].trim());
        songName = (c.indexOf('TitleUnicode:') != -1 ? /TitleUnicode:(.+)/.exec(c)[1].trim() : /Title:(.+)/.exec(c)[1].trim());
        difficultyName = /Version:(.+)/.exec(c)[1].trim();
        beatmapID = (c.indexOf('BeatmapID') != -1 ? /BeatmapID:(.+)/.exec(c)[1] : btoa(difficultyName));

        availableMaps[beatmapID] = {name: difficultyName, lead: /AudioLeadIn: (.+)/.exec(c)[1].trim(), objects: hitObjects};
      }
    });
  }
```

What this script basically does is:

1. Iterate through the files inside the .osz file (the zip variable)
2. Check if it's a .osu file
3. If it is, check that it's a taiko beatmap (as opposed to any other gamemode)
4. If it is, get the hit objects from the file
5. Put everything in an array to use later

<br>

If you're still somewhat confused, here's a run down of the most important parts:

```javascript
hitObjects = c.split('[HitObjects]')[1].trim();
```

Since the hit objects of a difficulty are the last things in the file, to get them all I can just split the file at the *[HitObjects]* header and grab everything after it.

```javascript
artistName = (c.indexOf('ArtistUnicode:') != -1 ? /ArtistUnicode:(.+)/.exec(c)[1].trim() : /Artist:(.+)/.exec(c)[1].trim());
```

osu! has two ways of storing both the artist name and song title, regular and Unicode. Unicode is used when the artist name or song title doesn't use the English character set (such as Japanese or Russian). This piece of code checks whether the Unicode artist name exists, and falls back to the regular romanized version if it doesn't.

```javascript
beatmapID = (c.indexOf('BeatmapID') != -1 ? /BeatmapID:(.+)/.exec(c)[1] : btoa(difficultyName));
```

When storing information about each individual difficulty I would use the unique Beatmap ID that was present in the file. However, from my extremely limited testing I found that some beatmaps don't contain this ID. In the case that it doesn't, it uses the difficulty name encoded using Base64 instead.

<br>

Now we've got all that out the way, the next thing to do is to properly parse the map's hitobjects. I choose to do this once the user has picked which difficulty they would like Taiko Cat to play, mainly to save resources on fully parsing things we won't need.

Once the user selects the difficulty they'd like Taiko Cat to play, the following code runs:

```javascript
difficultyInfo = availableMaps[e.target.dataset.mapId];
difficultiesList = null;

leadIn = (difficultyInfo['lead'] > 2000 ? difficultyInfo['lead'] : 2000);
hitObjectsSplit = difficultyInfo['objects'].split("\n");

hitObjectsSplit.forEach(function(i){
  splitI = i.trim().split(',');
  colour = '';

  //1 = red, 2 = red-hard, 3 = blue, 4 = blue-hard
  switch(splitI[4]){
    case '0':
      colour = '1';
    break;
    case '2':
      colour = '3';
    break;
    case '4':
      colour = '2';
    break;
    case '6':
      colour = '4';
    break;
    case '8':
      colour = '3';
    break;
    case '12': 
      colour = '4';
    break;
  }
    
  mapItems.push([parseInt(splitI[2])+parseInt(leadIn), splitI[3], colour]);
});

frame = window.requestAnimationFrame(draw);
```

To sum this up, it determines the lead-in time for the song (which is a minimum of 2000ms), then remaps the osu! hitsounds into the 4 main ones used by Taiko Cat (which we'll get into later). Finally, it pushes each hitobject into an array which will be read in in the draw function, which it then calls.

As a quick sidenote, I'm fully aware that the whole case switch section of the code is essentially the antithesis of ["Good Taste"](https://medium.com/@bartobri/applying-the-linus-tarvolds-good-taste-coding-requirement-99749f37684a){:target="_blank"}. However, since there's not really any obvious link between the numbers it's the best way I could see to do it at the time.

Anyway, with all that out of the way we can actually get on to the fun parts. Let's start with sound.

<h3 id="web-audio-vs-howler"><span>Web Audio vs howler</span></h3>

The two main choices I had was using the browser's built in [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API){:target="_blank"}, or using a library such as [howler.js](https://howlerjs.com/){:target="_blank"}.

I originally built Taiko Cat to use the Web Audio API to play all it's sounds, however later switched to using howler.js. At the time my reasoning for this was due to a playback issue that I misattributed to the Web Audio API, when in fact it was more likely an issue with my code. *(oops)*

However, looking back I think this was the right decision regardless. This is due simply to libraries like howler.js being *so* much easier to use. For example, had I extended Taiko Cat to include volume controls - which I did intend to do originally - the job would have been much easier using howler.js than the Web Audio API.

Next up, visuals!

<h3 id="guilty-confession"><span>You Wouldn't Steal a Cat</span></h3>

Let me start by saying that, aside from small changes and adjustments, I made essentially none of the graphics used on Taiko Cat. I also gave no credit to the people who did make them at the time, which was a pretty lame thing for me to do.

The images of the cat were lifted from an [older version of bongo.cat](http://web.archive.org/web/20180916092432/https://bongo.cat/){:target="_blank"}. The image of the drum was from deep in Google Images (so deep that I can't even find the specific image anymore).

Now that's out of the way, lets get on to how they all work. All of the images used for the cat are split up into different appendages:

<figure>
    <img src="/images/taiko-cat/cat_split_images.png" alt="A screenshot of all the images that make up Taiko Cat"/>
    <figcaption>All of the images that make up Taiko Cat. b indicating eyebrows or 'brows'. l indicating the left paw, r indicating the right. m indicates the mouth.</figcaption>
</figure>

This is done partly to make drawing the frames for the cat easier due to modularity, and partly because the original graphics were split up in this way.

These parts combined to make up 5 main frames. The first being the resting pose where the cat has both paws in the air, the second and third being the cat either hitting it's left or right paws on the drum, and the fourth and fifth being the hard versions of the previous two.

<figure>
    <img src="/images/taiko-cat/cat_frames_comp.png" alt="An image of four of the five frames of animation Taiko Cat uses"/>
    <figcaption>The four main frames of animation in Taiko Cat. The top two are regular hits, the bottom two being hard hits.</figcaption>
</figure>

Finally, now that we have all of the elements set up, the last thing to do is to put it all together.

<h3 id="playing-the-drum"><span>playing the drum</span></h3>

There's not a whole lot to talk about here outside of the code its self, so let's just jump right into it. If you thought the code before was messy, get ready for this.

```javascript
function draw(cT){
  if(loadDone == true){
    if(loading.classList.contains('active')){
      loading.classList.remove('active');
    }

    if(!startTime){
      startTime = Date.now();
    }else{
      timer = Math.ceil(Date.now() - startTime);
    }

    if(latestNote == false){
      latestNote = mapItems[0];
    }
```

The start of the draw function mainly just defines and checks a few things. It begins by checking whether or not everything has finished loading, removing the loading icon if it has.

Next, it checks if a timer has been started. If it hasn't, it defines the time that the drawing starts. If it has, it calculates the difference between the current time and the start time, telling us how far into the beatmap the app is.

Finally, it checks whether there is a note loaded into memory. If there isn't, it defaults it to the first note of the map.

The way that Taiko Cat works is it loads the latest note in memory and plays it as soon as it can. This can cause issues should the time between each frame be somewhat large (for example if the system were to lag), which would possibly make it skip notes or play them out of order.

However, due to most systems being able to run a basic web app with fairly consistent frame times and the general non-seriousness of this app, I don't see this as a massive issue.

```javascript
if(timer > leadIn){
  if(!audio.playing()){
    audio.play();
   }

  if(timer+100 >= latestNote[0]){
    drawCat();

    ctx.drawImage(leftUpImg, 0, 0);
    ctx.drawImage(rightUpImg, 0, 0);

    if(latestNote[2] == '2' || latestNote[2] == '4'){
      ctx.drawImage(browImg, 0, 0);
    }
  }

  if(timer >= latestNote[0]){
    if(timer-latestNote[0] < 200){
      drawCat();
      //read the note
      switch(latestNote[2]){
        case '1':
          ctx.drawImage(leftDownImg, 0, 0);
          ctx.drawImage(rightUpImg, 0, 0);

          redS.play();
        break;
        case '2':
          ctx.drawImage(leftDownHardImg, 0, 0);
          ctx.drawImage(rightUpImg, 0, 0);
          ctx.drawImage(browImg, 0, 0);

          redHardS.play();
        break;
        case '3':
          ctx.drawImage(rightDownImg, 0, 0);
          ctx.drawImage(leftUpImg, 0, 0);

          blueS.play();
        break;
        case '4':
          ctx.drawImage(rightDownHardImg, 0, 0);
          ctx.drawImage(leftUpImg, 0, 0);
          ctx.drawImage(browImg, 0, 0);

          blueHardS.play();
        break;
      }
    }

    latestNoteIndex += 1;
    latestNote = mapItems[latestNoteIndex+1];
  }
}
```

This is the meat of the whole app. It runs once the timer passes the lead-in time.

It begins by checking that the song is playing, and if it's not it starts it. Being honest, I don't remember why I added this code as it doesn't really make sense in my head. I'm sure there was some reason for it though, so I'll keep it there just in case.

The next piece of code makes the cat raise his arms to hit the drum ~100ms before it actually hits it. Without this the cat doesn't lift it's arms between notes, which looks especially weird if the same note plays multiple times in succession.

Also, for reference, the *drawCat()* function clears the canvas and draws the cat without any arms (which are added in later).

Next up, it checks whether the timer has passed the current note (and that it hasn't passed it by too much) then just draws the appropriate frame of the cat to the screen and plays the corresponding sound.

Finally, it replaces the current note with the next one of the map. 

<br>

And that's about it.

If you're interested in what this all looks like in action, here's a short demo of Taiko Cat playing [a song](https://www.youtube.com/watch?v=bAOpdNw5LHQ){:target="_blank"}:

<video src="/images/taiko-cat/taikocat_demo.webm" loading="lazy" controls></video>

<br>

<h3 id="reflections"><span>reflections</span></h3>

Overall, despite how unpolished the app is, I'm happy with the way that Taiko Cat turned out. However, here are a few things that I would've done differently had I made it today:

<h4 id="split-up-code">Split things up a bit</h4>

Right now, pretty much everything sits inside the index.html file. This includes all HTML, CSS and Javascript.

It wouldn't take a whole lot of effort to split these into their own separate files, however it would've made the finished product much more readable.

Not only this, but all of the JS is essentially in two big clumps. At the *bare minimum*, splitting the code up into functions would have helped improve readability and maintainability.

Ideally though it would have been better split everything up into separate files, using classes for each main part of the app.

<h4 id="test">Test it</h4>

I finished Taiko Cat at something like 11:30pm on a Sunday night, and needed to get up for work the next morning. For this reason, I didn't test it at all outside of during development. As I'm sure you can guess, this didn't work out great.

I'm pretty sure it still doesn't work on Firefox.

<h4 id="think-about-ux">Think about UX</h4>

While Taiko Cat does what it's meant to, and the interface is fairly simple, it's actually a massive pain in the arse for it's target audience to use.

The main reason for this is that the app requires you to upload .osz files to work. However, the majority of players have their browsers set to open these files rather than save them so they're automatically imported into the game.

This means that in order to find .osz files to open, the user has to either change their browser settings, download them using another browser or manually export them from the game its self - all of which are far too much effort for what Taiko Cat gives in return.

A way to improve this would have been to use a third party service to fetch and read beatmaps from an ID. However I didn't have the knowledge to implement this at the time.

<hr>

If you're interested in giving Taiko Cat a go, you can visit it [here](https://www.josh.ee/taikocat){:target="_blank"}. Alternatively, you can view the [source code on Github](https://github.com/joshuk/taikocat){:target="_blank"}.