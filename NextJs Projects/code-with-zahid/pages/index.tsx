import type { NextPage } from "next";
import Hero from "../components/hero/Hero";
import Navbar from "../components/navbar/Navbar";
import Specialization from "../components/specialization/specialization";
import Logo from "../components/ui/Logo";
import Meta from "../components/utils/Meta";

const Home: NextPage = () => {
  return (
    <div>
      <Meta />
      <header>
        <div className="container">
          <div className="header-navbar">
            <Logo />
            <Navbar />
          </div>
          <Hero />
        </div>
      </header>
      <main>
        <Specialization />
      </main>
    </div>
  );
};

export default Home;
