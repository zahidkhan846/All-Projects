const path = require("path")
// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const results = await graphql(`
    query blogPage {
      blogs: allStrapiBlogs {
        nodes {
          slug
        }
      }
    }
  `)
  results.data.blogs.nodes.forEach(blog => {
    createPage({
      path: `blogs/${blog.slug}`,
      component: path.resolve(`src/utility/templates/blogTemplate.js`),
      context: {
        slug: blog.slug,
      },
    })
  })
}
