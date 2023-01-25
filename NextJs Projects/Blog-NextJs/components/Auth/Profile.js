import { useState } from "react";
import classes from "../../styles/form.module.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useAlert } from "../../store/AlertContext";

function Profile({ session }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        userEmail: session.user.email,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      showAlert({
        type: "error",
        desc: data.message || "Could not change password.",
      });
      setLoading(false);
    } else {
      showAlert({
        type: "success",
        desc: data.message || "Successfully changed password.",
      });
      setLoading(false);
      setNewPassword("");
      setOldPassword("");
    }
    setLoading(false);
  };

  return (
    <section className={classes.userProfile}>
      <div className={classes.userHeading}>
        <VerifiedUserIcon
          className={classes.userHaedingIcon}
          fontSize="large"
          color="inherit"
        />
        <h1>{session.user.email}</h1>
      </div>
      <article className={classes.form}>
        <form onSubmit={handleSubmit}>
          <h2>Reset Password...</h2>
          <div className={classes.formControl}>
            <label htmlFor="password">Old Password</label>
            <input
              type="password"
              id="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="New Pasword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className={classes.btn}>
            <button
              disabled={loading}
              type="submit"
              className={classes.submitButton}
            >
              Change Passowrd
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default Profile;
