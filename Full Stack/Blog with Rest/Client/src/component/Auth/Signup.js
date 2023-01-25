import React, { useContext, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Signup() {
  const { userAuth } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (password !== confirmPassword) {
      return setError("Password doesn't match!");
    }

    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        userName: userName,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validaition failed, Email already exists.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing user faild!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setLoading(false);
        history.push("/login");
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
    <div className="form-container" onSubmit={handleFormSubmit}>
      <form className="mt-20 p-1">
        <h1 className="text-3xl mb-4 text-green-300">Signup Page</h1>
        {error && <p className="mb-2 text-red-400">{error}</p>}
        <label
          htmlFor="userName"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          User Name
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          className="mb-5 h-7 focus:border-grey-500 flex-1 block w-full border-2 border-green-500 rounded sm:text-sm"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <label
          htmlFor="password"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mb-5 h-7 focus:border-grey-500 flex-1 block w-full border-2 border-green-500 rounded sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="password"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="mb-5 h-7 focus:border-grey-500 flex-1 block w-full border-2 border-green-500 rounded sm:text-sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={loading}
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-green-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Sign Up
        </button>
      </form>
      <br />
      <p className="block text-m font-medium text-grey-700 mb-1">
        Already have an account{" "}
        <Link className="text-red-700" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
