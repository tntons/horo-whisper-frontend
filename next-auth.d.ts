import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    /** the Google ID‑token you added in your `callbacks.session` */
    idToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** the Google ID‑token you added in your `callbacks.jwt` */
    idToken?: string
  }
}