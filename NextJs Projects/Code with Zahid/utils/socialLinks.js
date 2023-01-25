import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const data = [
  {
    id: 1,
    icon: <FaFacebookF className="social-icon"></FaFacebookF>,
    url: "https://www.facebook.com/zahidkhan846",
  },
  {
    id: 2,
    icon: <FaLinkedinIn className="social-icon"></FaLinkedinIn>,
    url: "https://www.linkedin.com/in/zahidkhan846/",
  },
  {
    id: 3,
    icon: <FaGithub className="social-icon"></FaGithub>,
    url: "https://github.com/zahidkhan846",
  },
  {
    id: 4,
    icon: <FaInstagram className="social-icon"></FaInstagram>,
    url: "https://www.instagram.com/zahid.khan846",
  },
  {
    id: 5,
    icon: <FaTwitter className="social-icon"></FaTwitter>,
    url: "https://twitter.com/zahidkhanzk846",
  },
];

export const SocialLinks = () => {
  return (
    <ul className="social-links">
      {data.map((link) => (
        <li key={link.id}>
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};
