import { Fragment } from "react";
import About from "../components/About/About";
import Meta from "../components/Meta/Meta";

function AboutPage() {
  return (
    <Fragment>
      <Meta
        title="Code with Zahid | About Me"
        description="My name is Zahid Khan. I am a full stack developer. I especially work with ReactJs, Anguler, Vue, and NodeJs."
      />
      <About />
    </Fragment>
  );
}

export default AboutPage;
