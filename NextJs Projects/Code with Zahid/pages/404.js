import { Fragment, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../components/Meta/Meta";

function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fragment>
      <Meta title="Code with Zahid | Error" description="Page unavailble!" />
      <div className="flex-center flex-column gap-2">
        <h1>404 | Page Not Availble!</h1>
        <h3>
          Going back to home page...{" "}
          <Link href="/">
            <a style={{ color: "lightseagreen" }}>Click Me</a>
          </Link>{" "}
          if it's not automatically redirect.
        </h3>
      </div>
    </Fragment>
  );
}

export default ErrorPage;
