import { useRef, useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Twitter } from "@material-ui/icons";
import BusinessIcon from "@material-ui/icons/Business";
import { useNotification } from "../store/NotificationContext";

function Footer() {
  const { showNotifcation } = useNotification();

  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userEmail) {
      return showNotifcation({
        alertType: "error",
        title: "Error",
        message: "Please fill the input field to subscribe",
      });
    }

    showNotifcation({
      alertType: "info",
      title: "Loading...",
      message: "Please wait we adding your email...",
    });

    fetch("/api/subscribe", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Somthing went wrong");
        });
      })
      .then((data) => {
        showNotifcation({
          alertType: "success",
          title: "Success",
          message: data.message || "Successfully added!",
        });
      })
      .catch((err) =>
        showNotifcation({
          alertType: "error",
          title: "Error",
          message: `${err.message || "Somthing went wrong!"}`,
        })
      );
    setUserEmail("");
  };

  return (
    <div className="footer-container">
      <div className="footer">
        <h1>Events Manager</h1>
        <p className="address">
          <BusinessIcon />{" "}
          <span>987St. Random road, South Block, Florida, USA.</span>
        </p>
        <form onSubmit={handleSubmit}>
          <h2>Stay updated!</h2>
          <div>
            <input
              placeholder="Enter Your Email..."
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </div>
        </form>
        <div className="social">
          <h3>Fallow us on</h3>
          <div className="icon">
            <span>
              <FacebookIcon />
            </span>
            <span>
              <Twitter />
            </span>
            <span>
              <InstagramIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
