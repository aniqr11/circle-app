import { NextFunction, Request, Response } from "express";
import * as JWT from "jsonwebtoken";

export default new class AuthMiddleware {
   async auth(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    // console.log(authorizationHeader);
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
            return res.status(401).json({ error: "Unauthorized" })
   }  
   
   const token = authorizationHeader.split(" ")[1]
  //  console.log(token);
   
   try {
    const loginSession = JWT.verify(token,"SECRET_KEY")
    res.locals.loginSession = loginSession
    next()
   } catch (error) {
    console.log(error);
    
    return res.status(401).json({ error: "Unmatch token" })
   }
 }
 
}