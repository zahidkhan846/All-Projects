import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Register from "../../components/Auth/Register";

function SignUp() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/auth/login");
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex-center">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }
  return <Register />;
}

export default SignUp;
