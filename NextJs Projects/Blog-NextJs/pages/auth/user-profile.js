import { getSession } from "next-auth/client";
import React from "react";
import Profile from "../../components/Auth/Profile";

function User(props) {
  return <Profile session={props.session} />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
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

export default User;
