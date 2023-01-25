import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

export default function Blog(props) {
  const { slug, image, title, desc, date, category, id } = props
  return (
    <Link key={id} to={`/blogs/${slug}`} className="blog">
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
