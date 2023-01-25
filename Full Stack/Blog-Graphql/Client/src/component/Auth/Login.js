import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { login, error } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    history.push("/");
  };

  return (
    <div className="form-container">
      <form className="mt-20 p-1" onSubmit={handleFormSubmit}>
        {error ? <p className="text-red-300">{error}</p> : ""}
        <h1 className="text-3xl mb-4 text-green-300">Login Page</h1>
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
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-green-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Login
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
        Forgot your password{" "}
        <Link className="text-green-700" to="/reset-password">
          Reset Password
        </Link>
      </p>
    </div>
  );
}

export default Login;
