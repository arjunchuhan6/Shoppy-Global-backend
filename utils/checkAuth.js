import JWT from "jsonwebtoken"

// middleware function for auth check

export const checkAuth = (req, res, next) => {

    const { authtoken } = req.headers;
    if (!req.headers.authtoken) {
        return res.status(403).json({ success: false, message: "Auth token required" });
    }
    // verify auth token 
    JWT.verify(authtoken, "ARRAJJUPNUT", (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ success: false, message: "invalid token" });
        }
        req.user = user;
        next();
    })
}

