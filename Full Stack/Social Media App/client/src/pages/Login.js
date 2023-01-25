import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Error from "../components/Error";
import { useHistory } from "react-router-dom";
import { useAuth } from "../store/AuthReducer";
import { LOGIN_USER } from "../utils/GraphqlQueries";

function Login() {
  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { userLogin: userData } }) {
      login(userData);
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: {
      userName: userName,
      password: password,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="form">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={errors.userName ? true : false}
          placeholder="Enter Username"
        />
        <Form.Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password ? true : false}
          placeholder="Enter Password"
        />
        <Button type="submit" color="pink">
          Login
        </Button>
      </Form>
      {Object.keys(errors) &&
        Object.values(errors).map((errValue) => (
          <Error key={errValue} errValue={errValue} />
        ))}
    </div>
  );
}

export default Login;
