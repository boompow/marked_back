import {betterAuth} from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./BetterAuthDB.js";
import 'dotenv/config'
import {customSession} from "better-auth/plugins";

export const auth = betterAuth({
    database: mongodbAdapter(db),
    // CRITICAL: baseURL must include the /api/auth prefix for deployed environments
    baseURL: `${process.env.SERVER}/api/auth`,
    socialProviders: {
        google:{
            prompt: "select_account",
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Let Better Auth auto-generate redirectURI from baseURL
            // redirectURI will be: {baseURL}/callback/google
        },
    },
    trustedOrigins: [
    process.env.SERVER, // backend
    process.env.CLIENT, // frontend
  ],
  session:{
    expiresIn: 60*60*24*7, // session lifespan is 7 days
    updateAge: 60*15, // session is rotated every 15 min
    cookieCache: {
            enabled: true,
            maxAge: 5 * 60 
  }
},
advanced: {
  // Let cookie attributes handle security
  cookies: {
    session_token: {
      attributes: {
        // Use 'lax' instead of 'none' - better compatibility with deployments
        sameSite: "lax",
        secure: true,
        httpOnly: true,
        path: "/"
      },
    },
    // CRITICAL: Both oauth_state AND codeVerifier are needed for OAuth PKCE flow
    oauth_state: {
      attributes: {
        // Use 'lax' for OAuth cookies - they need to work during redirects
        sameSite: "lax",
        secure: true,
        httpOnly: true,
        path: "/",
        maxAge: 60*10 // 10 minutes
      },
    },
    codeVerifier: {
      attributes: {
        // Use 'lax' for OAuth cookies - they need to work during redirects
        sameSite: "lax",
        secure: true,
        httpOnly: true,
        path: "/",
        maxAge: 60*10 // 10 minutes
      },
    },
  },
  cookiePrefix: "marked-app",
},
  plugins:[
    customSession(async({user})=>{
      return {
        user: user
      }
    })
  ]

})