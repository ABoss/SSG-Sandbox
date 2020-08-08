const fs = require("fs");

module.exports = function(eleventyConfig) {

  // Allow deepmerge (i.e. cascading data, like tags)
  eleventyConfig.setDataDeepMerge(true);

  // Passthrough copy | Input directory: `src/site`; Output directory: `dist/`
  eleventyConfig.addPassthroughCopy("./src/site/images");
  eleventyConfig.addPassthroughCopy("./src/site/fonts");
  eleventyConfig.addPassthroughCopy("./src/site/*.ico");
    // Copy CSS files from styles to `dist/styles/`
    // Use NJK files in `site/styles/` to compile CSS partials from `_includes/css/`
  eleventyConfig.addPassthroughCopy("./src/site/styles/*.css");
  // Use NJK files in `site/styles/` to compile woffs from `_includes/css/`
  eleventyConfig.addPassthroughCopy("./src/site/styles/*.woff");
  eleventyConfig.addPassthroughCopy("./src/site/styles/*.woff2");
    // Copy JS files from `site/scripts/` to `dist/scripts/`
    // Use NJK files in `site/scripts/` to compile JS partials from `_includes/js/`
  eleventyConfig.addPassthroughCopy("./src/site/scripts/*.js");
  eleventyConfig.addPassthroughCopy("./src/site/scripts/*.css");

  // Copy EPC dependent scripts, styles and pngs to 'epc/'
  eleventyConfig.addPassthroughCopy("./src/site/epc/*.css");
  eleventyConfig.addPassthroughCopy("./src/site/epc/*.js");
  eleventyConfig.addPassthroughCopy("./src/site/epc/*.png");

  // Copy Drafter dependent scripts, styles, fonts and images to 'drafter/'
  eleventyConfig.addPassthroughCopy("./src/site/drafter/css");
  eleventyConfig.addPassthroughCopy("./src/site/drafter/fonts");
  eleventyConfig.addPassthroughCopy("./src/site/drafter/images");
  eleventyConfig.addPassthroughCopy("./src/site/drafter/js");

  // Passthrough CNAME file
  eleventyConfig.addPassthroughCopy("./src/site/CNAME");

  // Passthrough Contacts confirmation page - thanks.html
  eleventyConfig.addPassthroughCopy("./src/site/contact/thanks.html");



  // 404 for local testing
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Custom collections
/*   eleventyConfig.addCollection("docs", function(collection) {
    return collection.getFilteredByTag("docs").sort(function(a, b) {
      return a.data.navOrder - b.data.navOrder;
    });;
  }); */

  // limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Universal Shortcodes (adds to Liquid, Nunjucks, Handlebars & JavaScript)
     // format date & time
  eleventyConfig.addShortcode("date", require("./src/utils/shortcodes/date.js"));
  eleventyConfig.addShortcode("time", require("./src/utils/shortcodes/time.js"));
/*    // format site buttons
  eleventyConfig.addPairedShortcode("button", require("./src/utils/shortcodes/button.js"));
  eleventyConfig.addShortcode("svg", require("./src/utils/shortcodes/svg-icon.js")); */
  // insert faction icon
eleventyConfig.addShortcode("icon", require("./src/utils/shortcodes/icon.js"));
// hover text
eleventyConfig.addPairedShortcode("hover_text", require("./src/utils/shortcodes/hover_text.js"));
eleventyConfig.addPairedShortcode("hover_content", require("./src/utils/shortcodes/hover_content.js"));


  // check & format output
    // minify the html output
  // eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: "_data",
      includes: "_includes"
    },
    templateFormats : ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true,
    // Set prefix url for GitHub pages hosting
    pathPrefix: ""
  };
};
