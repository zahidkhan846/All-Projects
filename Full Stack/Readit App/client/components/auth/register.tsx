import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosConnect } from "../../config/axios";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAuth } from "../../context/auth";

function Register() {
  const { authenticated } = useAuth();
  const router = useRouter();

  if (authenticated) router.push("/");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreement, setAgreement] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!agreement) {
      setErrors({
        ...errors,
        agreement: "You have to agree to this agreement to continue",
      });
      setLoading(false);
      return;
    }

    try {
      if (
        password !== confirmPassword ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        setLoading(false);
        setErrors({ ...errors, confirmPassword: "Password did not match!" });
        return;
      }
      await axiosConnect.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/auth/login");
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex bg-white">
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url(/images/register.jpg)" }}
      ></div>
      <div className="flex flex-col justify-center pl-6 w-72">
        <h1 className="mb-2 text-lg">Sign Up</h1>
        <p className="mb-10 text-xs">
          {errors.agreement ? (
            <span className="font-medium text-red-600">{errors.agreement}</span>
          ) : (
            <span>
              By continuing, you agree to our User Agreement and Privacy Policy
            </span>
          )}
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <input
              type="checkbox"
              className="mr-1 cursor-pointer"
              id="agreement"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
            />
            <label htmlFor="agreement" className="text-xs cursor-pointer">
              I agree to get emails about cool stuff on readit
            </label>
          </div>
          <Input
            className="mb-2"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="Eamil"
            error={errors.email}
          />
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
          <Input
            className="mb-2"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="Confirm Password"
            error={errors.confirmPassword}
          />
          <Button type="submit" disabled={loading}>
            Continue
          </Button>
          <p className="text-xs text-grey-100">
            Already a redditor?{" "}
            <Link href="/auth/login">
              <a className="font-bold text-blue-500">LOG IN</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
