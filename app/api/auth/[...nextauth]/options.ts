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
    async jwt({ token, user }: { token: any; user: any }) {
      console.log("user2", user);
      if (user?.user) {
        token.user = user.user;
      }
      console.log("first token", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("token", token);
      if (session.user) {
        session.user = token.user;
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
