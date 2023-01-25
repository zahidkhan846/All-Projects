import { getSession } from "next-auth/client";
import SignIn from "../../components/Auth/Login";

function Login() {
  return <SignIn />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/posts",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Login;
