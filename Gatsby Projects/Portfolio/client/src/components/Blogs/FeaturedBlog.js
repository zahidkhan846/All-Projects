import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

export default function Blog(props) {
  const { slug, desc, date, title, category, image } = props

  return (
    <Link to={`blogs/${slug}`} className="blog">
      <article>
        <Image fluid={image.childImageSharp.fluid} className="blog-img" />
        <div className="blog-card">
          <h4>{title}</h4>
          <p>{desc}</p>
          <div className="blog-footer">
            <p>{category}</p>
            <p>{date}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
