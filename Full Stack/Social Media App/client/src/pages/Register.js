import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Error from "../components/Error";
import { useHistory } from "react-router-dom";
import { useAuth } from "../store/AuthReducer";
import { REGISTER_USER } from "../utils/GraphqlQueries";

function Register() {
  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { userLogin: userData } }) {
      login(userData);
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="form">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={errors.userName ? true : false}
          placeholder="Enter Username"
        />
        <Form.Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email ? true : false}
          placeholder="Enter Email"
        />
        <Form.Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password ? true : false}
          placeholder="Enter Password"
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword ? true : false}
          placeholder="Confirm Password"
        />
        <Button type="submit" color="pink">
          Register
        </Button>
      </Form>
      {Object.keys(errors) &&
        Object.values(errors).map((errValue) => (
          <Error key={errValue} errValue={errValue} />
        ))}
    </div>
  );
}

export default Register;
