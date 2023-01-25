const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: "Code With Zahid",
    description: "This is a protfolio website of Zahid Khan",
    author: "@Zahid",
    twitterUsername: "@zahidkhanzk846",
    image: "/twitter-img.png",
    siteUrl: "https://codewithzahid.com",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000,
        contentTypes: [`projects`, `blogs`],
        singleTypes: [`about`],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Open Sans`, `Roboto\:400,700`],
        display: "swap",
      },
    },
  ],
};
