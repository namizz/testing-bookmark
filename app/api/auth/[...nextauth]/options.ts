import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          role: "user",
        };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(data) {
        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          console.error("Login request failed:", res.status, await res.text());
          return null;
        }
        const user = await res.json();
        console.log("user", user);

        return { user };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("user2", user);
      if (user?.user?.data) {
        token.name = user.user.data.name;
        token.id = user.user.data.id;
        token.role = user.user.data.role;
        token.profilePicUrl = user.user.data.profilePicUrl;
        token.accessToken = user.user.data.accessToken;
      }
      console.log("first token", token);
      return token;
    },
    async session({ session, token }) {
      console.log("token", token);
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      console.log("session", session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
