
// middleware to verify the session cookie sent in the request header

import { auth } from "../auth.js"

async function authenticate(req, res, next){
    try {
        const session =  await auth.api.getSession({
        headers: req.headers
        })

        if(!session){
            return res.status(401).json({
                error: true,
                message:"Unauthorized"
            })
        }

        req.user = session.user
        next()
    } catch (error) {
        return res.status(500).json({
                error: true,
                message:"Internal Server Error"
            })
    }

}

export default authenticate