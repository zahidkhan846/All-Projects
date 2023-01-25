import React, { useState, useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ResetPassword() {
  const { userAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    fetch("http://localhost:8080/auth/reset-password", {
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
    setLoading(false);
  };

  if (userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <form className="mt-20 p-1" onSubmit={handleFormSubmit}>
        {error ? <p className="text-red-300">{error}</p> : ""}
        <h1 className="text-3xl mb-4 text-green-300">Reset Password</h1>
        <label
          htmlFor="email"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mb-5 h-7 focus:border-grey-500 flex-1 block w-full border-2 border-green-500 rounded sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-green-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Reset Password
        </button>
      </form>
      <br />
      <p className="block text-m font-medium text-grey-700 mb-1">
        Don't have an account{" "}
        <Link className="text-red-700" to="/signup">
          Sign Up
        </Link>
      </p>
      <br />
      <p className="block text-m font-medium text-grey-700 mb-1">
        Already got an account{" "}
        <Link className="text-green-700" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default ResetPassword;
