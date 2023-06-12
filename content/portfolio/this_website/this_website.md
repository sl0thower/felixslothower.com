---
title: This website...
id: this_website
order: 5
---

I am proud enough of my website at the moment to include a whole page about it in my portfolio. I created it from scratch, drawing inspiration from different sources, one of them being a terminally incomplete portfolio website by Vivien Hantusch which I kindly ripped and used as my own for the past couple years. Once more of a public figure, it seems she has taken a step back from the limelight. The only place I saw her was on a podcast hosted by Third Row Tesla three years ago.

{% image "./old_website.png", "screenshot of old website"%}
<!-- My previous landing page, which was a near hard copy of Vivien's. It stayed like this for three years! -->

My inspiration for the animation comes from the wireframe model view that is offered in Solidworks along with the WebGL based, interactive rendering, that you can create in the Solidworks Composer tool. It took a while to figure out how I could replicate this on the website but I am pleased with the result. The process uses a [Sobel filter](https://en.wikipedia.org/wiki/Sobel_operator) which is a type of edge detector that produces the sharp white lines you see on the spinning animation to the left. It isn't the exact same as the Solidworks version but this is because I am only providing [three.js](https://threejs.org/) (the rendering package) with an .stl and not the original CAD file. 

>P.S. you can give your computer a rest and pause the animation by clicking on it.

{% image "./solidworks_screenshot.png", "screenshot of solidworks" %}
<!-- A screenshot of the solidworks wireframe view for reference. -->

My biggest challenge when making this website, which started out as just a portfolio, was simply writing and composing the contents of the portfolio. The technical side of the website; the javascript, html, css, RSS feeds, hosting, etc., took time too but demanded nowhere near the same amount of patience. It would be fair to conclude that I'm much more inclined to program an n-body orbit simulator than spin a yarn about the formative years of my education.

Originally the different pages in this portfolio were written in Markdown and then converted to HTML using a tool called Pandoc. Managing all these pages required manually reprocessing each Markdown page when a change was made and if I wanted to create a new page it would need to be added to the menu on the left. The website was also being hosted using an AWS S3 bucket, and again, any changes would have to be manually uploaded every time to the bucket. This didn't feel like a good long term solution so I set off to port my website to the [11ty](https://www.11ty.dev) SSG and also change the host to [Netlify](https://www.netlify.com/). Now any changes made will be live once I push them to my git [repo](https://github.com/sl0thower/felixslothower.com)[^patrick]. And Netlify is free! I'm saving a whopping $0.50 a month by not using AWS anymore.  

[^patrick]:Just wanted to give a small shoutout to my friend Patrick Youssef for convincing me that switching to an SSG was worth the headache. You can find his website [here](https://www.patrickyoussef.com)

If I haven't done it already I plan on adding a blog to my website with an RSS feed for my friends and family to follow. Such a solution is my way of sharing what I'm up to while avoiding the engineered death scroll of Instagram et. al. And (admitting some sass) if someone cares enough it shouldn't be too hard to download a free RSS reader and punch in my url.
