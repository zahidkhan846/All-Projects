import Link from "next/link";

function Navbar() {
  return (
    <header className="header container">
      <h1>
        Web<span>News</span>
      </h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
