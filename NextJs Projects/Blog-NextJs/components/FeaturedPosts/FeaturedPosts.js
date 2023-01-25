import Card from "../UI/Card/Card";

function FeaturedPosts({ featuredPosts }) {
  return (
    <section className="featured-container">
      <h1 className="py-1 text-center featured">Featured Posts</h1>
      <div className="underline"></div>
      <div className="card-list">
        {featuredPosts &&
          featuredPosts.map((post) => <Card key={post._id} post={post} />)}
      </div>
    </section>
  );
}

export default FeaturedPosts;
