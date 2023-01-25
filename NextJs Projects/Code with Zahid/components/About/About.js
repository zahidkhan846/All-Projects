import styles from "./About.module.css";
import Image from "next/image";
import Link from "next/link";
import { VscFilePdf } from "react-icons/vsc";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heading}>
        <h1 className="text-center">About Me</h1>
        <div className="underline"></div>
      </div>
      <section>
        <article className={styles.about}>
          <Image src="/assets/me.jpg" alt="about" height={300} width={300} />
          <div className={styles.aboutInfo}>
            <h2 className="text-colorful">About Me</h2>
            <p>
              Hi, My name is Zahid Khan. I work around design and development, i
              work with front-end and backend both technologies. I would like to
              define myself by the work i have done, I have learned a lot during
              projects that i have created and I have done quite a good amount
              of them, I am not very experienced I am still learning and I want
              to keep doing new challenges. My abundant energy fuels me in the
              pursuit of many interests, hobbies, areas of study. I am a fast
              learner, able to pick up new skills and juggle different projects
              and roles with relative ease.
            </p>
            <p>
              When I got into web development, I liked it and i enjoyed it, I
              enjoyed making new cool things, and the meaning of like and
              enjoyed is that I was only going for React (a front-end
              framework/liberary for building interactive user interfaces) when
              I started but when I got into this I ended up studying not only
              React but Anguler, Vue, NodeJs, ExpressJs, Deno, obviously HTML,
              CSS, JavaScript, and databases like MongoDB, MySql, and i also
              learned TypeScript, Graphql, React Native, and Angular. I am not
              an expert on all these technologies that I have mentioned here but
              i am good enough to handle front-end needs from the backend and
              provide good user experience too.
            </p>
            <p>
              You can learn more about my Technical skills, projects, education
              in the document attached below.
            </p>
            <div className={styles.btn}>
              <Link href="/">
                <a>
                  <span>My Resume</span>{" "}
                  <VscFilePdf className={styles.pdfIcon} />
                </a>
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
