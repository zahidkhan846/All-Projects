import { VscCode } from "react-icons/vsc";
import { DiCss3Full, DiJavascript1 } from "react-icons/di";
import { IoIosApps } from "react-icons/io";
import { AiFillHtml5 } from "react-icons/ai";
import { GrGraphQl } from "react-icons/gr";
import { BiServer } from "react-icons/bi";
import {
  SiDeno,
  SiApollographql,
  SiNextDotJs,
  SiMysql,
  SiMongodb,
} from "react-icons/si";
import {
  FaReact,
  FaAngular,
  FaSass,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
} from "react-icons/fa";
import styles from "../components/UI/Cards/Simple/SimpleCard.module.css";

export const frontIcons = {
  html: <AiFillHtml5 className={styles.cardIcon} />,
  css: <DiCss3Full className={styles.cardIcon} />,
  js: <DiJavascript1 className={styles.cardIcon} />,
  react: <FaReact className={styles.cardIcon} />,
  anguler: <FaAngular className={styles.cardIcon} />,
  sass: <FaSass className={styles.cardIcon} />,
};

export const backIcons = {
  node: <FaNodeJs className={styles.cardIcon} />,
  graphql: <GrGraphQl className={styles.cardIcon} />,
  deno: <SiDeno className={styles.cardIcon} />,
  apollo: <SiApollographql className={styles.cardIcon} />,
  next: <SiNextDotJs className={styles.cardIcon} />,
};

export const otherIcons = {
  reactNative: <FaReact className={styles.cardIcon} />,
  mongo: <SiMongodb className={styles.cardIcon} />,
  mysql: <SiMysql className={styles.cardIcon} />,
  git: <FaGitAlt className={styles.cardIcon} />,
  github: <FaGithub className={styles.cardIcon} />,
};

export const specializations = [
  {
    id: "1",
    headIcon: <VscCode className={styles.headingIcon} />,
    title: "FRONT-END DEVELOPMENT",
    description:
      "I like to code things from scratch, and enjoy bringing ideas to life in the browser.",
    spHead: "Technologies I Know",
    specializationIcons: Object.values(frontIcons).map((icon) => icon),
  },
  {
    id: "2",
    headIcon: <BiServer className={styles.headingIcon} />,
    title: "Back-end Development",
    description:
      "I write web services and APIs. Which can be used by front-end web apps and mobile apps.",
    spHead: "Technologies I Know",
    specializationIcons: Object.values(backIcons).map((icon) => icon),
  },
  {
    id: "3",
    headIcon: <IoIosApps className={styles.headingIcon} />,
    title: "Mobile & Other",
    description:
      "I also do mobile development epesially in React Native, for data storage i use no-sql databases like mongodb or firestore.",
    spHead: "Technologies i know",
    specializationIcons: Object.values(otherIcons).map((icon) => icon),
  },
];
