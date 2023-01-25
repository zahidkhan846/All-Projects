import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { dbConnect } from "../../../utils/database";
import { verifyPassword } from "../../../utils/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await dbConnect();
        const db = client.db();

        const usersCollections = db.collection("users");

        const user = await usersCollections.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid Password!");
        }

        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
});
