import {betterAuth} from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./BetterAuthDB.js";
import 'dotenv/config'
import {customSession} from "better-auth/plugins";

export const auth = betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.SERVER,
    socialProviders: {
        google:{
            prompt: "select_account",
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI:process.env.REDIRECT_URI
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
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    session_token: {
      attributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: "/"
      },
    },
    oauth_state: {
      attributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: "/",
        maxAge: 60*10
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