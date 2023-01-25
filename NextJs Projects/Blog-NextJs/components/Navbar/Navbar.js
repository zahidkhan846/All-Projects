import classes from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { ExitToApp } from "@material-ui/icons";

function Navbar() {
  const [session, loading] = useSession();

  const router = useRouter();

  const logoutHandler = async () => {
    const data = await signOut({
      callbackUrl: "http://localhost:3000",
      redirect: false,
    });

    router.push(data.url);
  };

  return (
    <section className={classes.navbar}>
      <div className="container">
        <header className={classes.header}>
          <Link href="/">
            <a className={classes.logo}>
              <Image
                src="/images/logo.png"
                width={50}
                height={50}
                alt="brand-logo"
              />
              <h1 className={classes.brandTitle}>WebDev</h1>
            </a>
          </Link>
          <nav>
            <ul className={classes.navLinks}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/posts">All Posts</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              {session ? (
                <li>
                  <Link href="/auth/user-profile">Profile</Link>
                </li>
              ) : (
                <li>
                  <Link href="/about">About</Link>
                </li>
              )}
              {!session ? (
                <li>
                  <Link href="/auth/login">Login</Link>
                </li>
              ) : (
                <li>
                  <button onClick={logoutHandler}>
                    <ExitToApp color="inherit" />
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </div>
    </section>
  );
}

export default Navbar;
