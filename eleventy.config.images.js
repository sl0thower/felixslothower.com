const path = require("path");
const outdent = require("outdent");
const Image = require("@11ty/eleventy-img");

const stringifyAttributes = (attributeMap) => {
	return Object.entries(attributeMap)
	  .map(([attribute, value]) => {
		if (typeof value === 'undefined') return '';
		return `${attribute}="${value}"`;
	  })
	  .join(' ');
  };

module.exports = eleventyConfig => {

	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();
		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	eleventyConfig.addNunjucksAsyncShortcode("image", async function(
		src,
		alt,
		className = undefined,
		widths = [400, 800, 1280],
		formats = ['webp', 'jpeg'],
		sizes = '100vw') {

		file = relativeToInputPath(this.page.inputPath, src)
		const imageMetadata = await Image(file, {
			widths: [...widths, null],
			formats: [...formats, null],
			outputDir: '_site/assets/images',
			urlPath: '/assets/images',
		});
		
		const sourceHtmlString = Object.values(imageMetadata)
			// Map each format to the source HTML markup
			.map((images) => {
			// The first entry is representative of all the others
			// since they each have the same shape
			const { sourceType } = images[0];
		
			// Use our util from earlier to make our lives easier
			const sourceAttributes = stringifyAttributes({
				type: sourceType,
				// srcset needs to be a comma-separated attribute
				srcset: images.map((image) => image.srcset).join(', '),
				sizes,
			});
		
			// Return one <source> per format
			return `<source ${sourceAttributes}>`;
			})
			.join('\n');
		
		const getLargestImage = (format) => {
			const images = imageMetadata[format];
			return images[images.length - 1];
		}
		
		const largestUnoptimizedImg = getLargestImage(formats[0]);
		const imgAttributes = stringifyAttributes({
			src: largestUnoptimizedImg.url,
			// width: largestUnoptimizedImg.width,
			// height: largestUnoptimizedImg.height,
			alt,
			loading: 'lazy',
			decoding: 'async',
		});
		const imgHtmlString = `<img ${imgAttributes}>`;
		
		const pictureAttributes = stringifyAttributes({
			class: className,
		});
		const picture = `<picture ${pictureAttributes} style="flex-grow:calc(${largestUnoptimizedImg.width}/${largestUnoptimizedImg.height})">
			${sourceHtmlString}
			${imgHtmlString}
		</picture>`;
		
		return outdent`${picture}`;
		});

};

