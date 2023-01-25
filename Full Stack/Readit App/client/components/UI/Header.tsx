import Link from "next/link";
import React from "react";
import HeaderButtons from "./HeaderButtons";
import Logo from "./Logo";
import Search from "./Search";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 gap-4 px-5 bg-white">
      <div>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <div className="flex-1" style={{ maxWidth: "600px" }}>
        <Search />
      </div>
      <div>
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
