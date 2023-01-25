import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function Seo({ title, description }) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteInfo: siteMetadata {
          author
          siteDesc: description
          image
          siteUrl
          siteTitle: title
          twitterUsername
        }
      }
    }
  `);
  const {
    site: {
      siteInfo: { siteDecs, image, siteUrl, siteTitle, twitterUsername },
    },
  } = data;

  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={`${title} | ${siteTitle}`}>
      <meta name="description" content={description || siteDecs} />
      <meta name="image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDecs} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  );
}
