# WebGL Website project

## How to write a new page for portfolio

It is looking like I will use the markdown-it parser tool with node.js in a seperate environment from this website project. It will then create the html code with CSS embedded and I will copy paste that into the new page. If I can I would have the html import a seperate .html file into that specific \<div\> where the markdown should go.

## Latest on creating new pages

The workflow I have settled on, and that still needs refining, is to write a markdown file, then convert it to basic html using;\
```pandoc file.md -o file.html```\
The resulting .html is loaded in the relevant page.html in the "main" \<div\>.

This is likely 10x more painful than just using Gatsby or some other shit like that but kinda just had to do it this way.

## Later plans
- Expand to include a blog and photo library
- Host using aws Cloudfront and Origin Access Identity (OAI) so that my S3 bucket isn't public




