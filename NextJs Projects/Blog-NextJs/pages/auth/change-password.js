import { getSession } from "next-auth/client";
import React from "react";
import ResetPassword from "../../components/Auth/ResetPassword";

function ChangePassword(props) {
  return <ResetPassword />;
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

export default ChangePassword;
