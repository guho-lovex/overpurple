/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

module.exports = {
  pathPrefix: '/overpurple.io',
  siteMetadata: {
    title: `Overpurple`,
    author: {
      name: `GuHo`,
      summary: `Record`,
      author_avatar: `../assets/xiaolan.png`,
    },
    description: `A blog by Guho`,
    siteUrl: `https://guho-lovex.github.io/overpurple.io/`,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs-copy-button`,
          `gatsby-remark-prismjs`,
        ],
        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Overpurple.io`,
        short_name: `Overpurple`,
        start_url: `/`,
        background_color: `#ffffff`,
        icon: `src/assets/xiaolan.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-sitemap`,
  ],
};
