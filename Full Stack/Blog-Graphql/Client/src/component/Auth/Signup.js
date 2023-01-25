import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      return setError("Password doesn't match!");
    }

    const graphqlQuery = {
      query: `
      mutation {
        createUser(userInput: {email: "${email}", name: "${name}", password: "${password}"}) {
          _id
          email
        }
      }      
      `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error("Validation failed!");
        }
        if (resData.errors) {
          throw new Error("Signup failed,  Email already exists!");
        }
        console.log(resData);
        setLoading(false);
        history.push("/login");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="form-container" onSubmit={handleFormSubmit}>
      <form className="mt-20 p-1">
        <h1 className="text-3xl mb-4 text-green-300">Signup Page</h1>
        {error && <p className="mb-2 text-red-400">{error}</p>}
        <label
          htmlFor="name"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          User Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mb-5 h-7 focus:border-grey-500 flex-1 block w-full border-2 border-green-500 rounded sm:text-sm"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
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
          onChange={(event) => setConfirmPassword(event.target.value)}
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
