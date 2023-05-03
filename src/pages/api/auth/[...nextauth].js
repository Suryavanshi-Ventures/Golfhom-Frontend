import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials, req) {
        console.log(credentials, "FROM AUTH JS FILE");
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        //! LOGIN API CALL
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/user/login`,
          {
            email: credentials.email,
            password: credentials.password,
          }
        );

        //* IF LOGIN SUCCESSFUL
        if (response.status === 200) {
          setIsModalOpen(false);
          return response.data;
        } else {
          return false;
        }
      },
    }),
  ],
});
