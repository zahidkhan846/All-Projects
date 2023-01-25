import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import classes from "../Post/Post.module.css";
import { PrismLight as SyntaxHighlither } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";

SyntaxHighlither.registerLanguage("jsx", jsx);
SyntaxHighlither.registerLanguage("css", css);
SyntaxHighlither.registerLanguage("js", js);

function Post({ post }) {
  let langStyle;

  if (post.tags.includes("css")) {
    langStyle = "css";
  }

  if (
    post.tags.includes("react") ||
    post.tags.includes("next") ||
    post.tags.includes("gatsby") ||
    post.tags.includes("html") ||
    post.tags.includes("other")
  ) {
    langStyle = "jsx";
  }

  if (post.tags.includes("js") || post.tags.includes("node")) {
    langStyle = "js";
  }

  return (
    <section>
      <div className="py-2">
        <h1 className="text-center py-min font-big featured">Single Page</h1>
        <div className="underline"></div>
      </div>
      <article className={classes.singlePageContainer}>
        <div className="my-min">
          <h2>{post.title}</h2>
        </div>
        <div>
          <Image src={post.imageUrl} alt="hero" height={300} width={500} />
        </div>
        <div className={classes.singlePostContent}>
          <p className={classes.time}>
            <span>Posted on</span>{" "}
            {moment(post.createAt).format("MMMM Do YYYY")}
          </p>
          <p className="py-1">{post.content}</p>
          {post.code && (
            <SyntaxHighlither language={langStyle} style={atomDark}>
              {post.code}
            </SyntaxHighlither>
          )}
          <p className={classes.author}>
            <span>Written by</span> {post.author}
          </p>
        </div>
        <div className="my-2">
          <Link href="/">Go Back to Home</Link>
        </div>
      </article>
    </section>
  );
}

export default Post;
