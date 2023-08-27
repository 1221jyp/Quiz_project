import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/db";
require("dotenv").config();

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.githubOAuthID,
      clientSecret: process.env.githubOAuthKey,
    }),
    GoogleProvider({
      clientId: process.env.googleOAuthID,
      clientSecret: process.env.googleOAuthKey,
    }),
  ],
  secret: process.env.JWTpassword,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
