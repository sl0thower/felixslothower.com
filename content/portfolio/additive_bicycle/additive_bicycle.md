---
title: Additive Bicycle
id: additive_bicycle
order: 1
---

*Design of an additively manufactured and weldless mountain bike.*

### Background

For my senior project at UCI, me and two other friends tried to imagine what the future of high performance mountain-biking might look like. New technologies such as additive manufacturing in metal and ultra-high bond adhesives led us to rethink the way bicycles are manufactured. Using these technologies we believed  a high performance, carbon and titanium mountain bike, could be custom fit to each customer and assembled without the need for laborious welding operations.

This was the driving mission behind our project, but as some might already suspect, such a future is many years out as the cost of additive manufacturing still needs to come down for this to be a viable product. This idea is not novel. There are multiple other companies and individuals doing something similar; Atherton Bikes, Bastion Cycles, a guy named Ralf Holleis who's bike he called the Moorhuhn 129 (this bike is the unspoken crown jewel, but sadly it never went into production).

### 3D Modeling

The bicycle is primarily made up of carbon tubes and 3D printed lugs. The lugs were modeled in CAD and allow for updates in the underlying geometry, enabling a custom spec for each customer. I pushed myself to use the more advanced surfacing techniques available in Solidworks so that I could achieve more natural and smooth radiuses. As Solidworks is not the best surfacing tool, the modeling of the lugs came with several setbacks and reworks. But in the end I was able to model the headtube lug, bottom bracket lug and seattube lug.


{% image "./Gluebi_v1.png", "render of the complete front triangle" %}

### Simulations

Two different simulation tools were used; nTopology and Abacus. Screenshots from both tools are shown respectively. nTopology was used to simulate the rider load at the bottom bracket and analyze the strength of our design. Abacus was used to model the carbon tube layups and decide on a suitable strength for our application. We were not able to do a full assembly simulation due to limited computer resources so discrete simulations were carried out instead.

<p class="img_row_container">
{% image "./BB Sim 1.png", "render of the complete front triangle", "img_row" %}
{% image "./Tube_ply.png", "render of the complete front triangle", "img_row" %}
<p>

### Production

With the school year coming to a close we had just enough time to launch two prints, the first being only a small section of the seattube lug as seen in the first image. Print management and instructions were handled with Autodesk Netfabb. We were also able to print the full bottom bracket lug.

I feel like it's only fair to mention that due to poor design oversight (and not conducting a rigorous design review!) some of the dimensions were improperly spec'd. It came as a heavy blow to the team's moral but there was no reason to point fingers, everyone held the responsibility to check and then re-check all the dimensions. Looking back on this I am still proud of what we were able to accomplish, and while it may have it's flaws, the bottom bracket sits proudly on my shelf, kinda like a trophy.

<p class="img_row_container">
{% image "./IMG_2312.jpg", "build-plate", "img_row" %}
{% image "./IMG_2334.jpg", "machining-ops", "img_row" %}
{% image "./IMG_2350.jpg", "SLM-interior", "img_row" %}
</p>

{% image "./IMG_4998_cropped.jpg", "printed-bb-vice" %}

{% image "./IMG-8908.jpg", "printed-bb" %}

Finally, I want to give credit to the other members of the team. Some solid project partners and I'm happy to still call them friends today.