# This Website

I am proud enough of my website at the moment to include a whole page about it in my portfolio. I created it from scratch, drawing inspiration from different sources, one of them being a terminally incomplete portfolio website by Vivien Hantusch which I kindly ripped and used as my own for the past couple years. Once more of a public figure, it seems she has taken a step back from the limelight. Only place I saw her was on a podcast hosted by Third Row Tesla three years ago.

<p class="img_solo" align="center">
  <img style="margin-left:auto;margin-right:auto" alt="frame" src=".\media\portfolio\this_website\old_website.png" />My previous landing page, which was a near hard copy of Vivien's. It stayed like this for three years!
</p> 

Another inspiration was the wireframe model view that is offered in Solidworks along with the WebGL based, interactive rendering that you can create in the Solidworks Composer tool. It took a while to figure out how I could replicate this on the website but I am pleased with the result. The process uses a Sobel filter which is a type of edge detector that produces the sharp white lines you see on the spinning model. It isn't the exact same as the Solidworks version but this is because I am only providing `three.js` (the rendering package) with an .stl and not the original CAD file. 

>*P.S. you can give your computer a rest and pause the animation by clicking on it.* 

<p class="img_solo" align="center">
  <img style="margin-left:auto;margin-right:auto" alt="frame" src=".\media\portfolio\this_website\solidworks_screenshot.png" />A screenshot of the solidworks wireframe view for reference.
</p> 

My biggest challenge when making this website, which started out as just a portfolio, was simply writing and composing the contents of the portfolio. The technical side of the website; the javascript, html, css, RSS feeds, hosting, etc., took time too but demanded nowhere near the same amount of patience. It would be fair to conclude that I'm much more inclined to program an n-body orbit simulator than spin a yarn about the formative years of my education.

I guess the only interesting thing worth mentioning is that each of the portfolio pages was written as a markdown file (.md) and then converted to an .html page with a tool called `pandoc`. I then used a bit of javascript to load up each page into the empty div on the right (kinda like the page you are reading now). This made formatting each page a lot easier.

If I haven't done it already I plan on adding a blog to my website with an RSS feed for my friends and family to follow. Such a solution is my way of sharing what I'm up to while avoiding the engineered death scroll of Instagram et. al. And (admitting some sass) if someone cares enough it shouldn't be too hard to download a free RSS reader and punch in my url. :blush:

### Linx

pandoc: [pandoc.org](https://pandoc.org/)\
Sobel filter: [threejs.org/examples/sobel](https://threejs.org/examples/?q=sobel#webgl_postprocessing_sobel)\
three.js: [threejs.org](https://threejs.org/)\
docs: [w3schools.com](https://www.w3schools.com/html/html_basic.asp)

