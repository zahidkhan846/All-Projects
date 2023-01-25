import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosConnect } from "../../config/axios";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAuth } from "../../context/auth";

function Login() {
  const { login, authenticated } = useAuth();

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosConnect.post("/auth/login", {
        username,
        password,
      });

      login(res.data);
      router.push("/");
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
    setLoading(false);
  };

  if (authenticated) {
    router.push("/");
  }
  return (
    <div className="flex bg-white">
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url(/images/login.jpg)" }}
      ></div>
      <div className="flex flex-col justify-center pl-6 w-72">
        <h1 className="mb-2 text-lg">Sign In</h1>

        <form onSubmit={handleLogin}>
          <Input
            className="mb-2"
            type="text"
            value={username}
            setValue={setUsername}
            placeholder="Username"
            error={errors.username}
          />
          <Input
            className="mb-2"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            error={errors.password}
          />

          <Button type="submit" disabled={loading}>
            Continue
          </Button>
          <p className="text-xs text-grey-100">
            Don't have an account?{" "}
            <Link href="/auth/register">
              <a className="font-bold text-blue-500">Register</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
