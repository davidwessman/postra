const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const postcss_preset_env = require("postcss-preset-env");
const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      // etc.
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  })


module.exports = ({ env }) => ({
    plugins: [
        tailwindcss("./tailwind.config.js"),
        autoprefixer({
            add: true,
            grid: true
        }),
        postcss_preset_env({
            stage: 0,
        }),
        ...process.env.NODE_ENV === 'production'
        ? [purgecss]
        : []
    ]
});
