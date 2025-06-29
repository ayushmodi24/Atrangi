"use strict";
// // import { NextFunction, Request, Response } from "express";
// // import jwt, { JwtPayload } from "jsonwebtoken";
// // import { JWT_PASSWORD } from "./config";
// // export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
// //     const header = req.headers["authorization"];
// //     const decoded = jwt.verify(header as string, JWT_PASSWORD)
// //     if (decoded) {
// //         if (typeof decoded === "string") {
// //             res.status(403).json({
// //                 message: "You are not logged in"
// //             })
// //             return;    
// //         }
// //         req.userId = (decoded as JwtPayload).id;
// //         next()
// //     } else {
// //         res.status(403).json({
// //             message: "You are not logged in"
// //         })
// //     }
// // }
// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_PASSWORD } from "./config/config";
// // const JWT_PASSWORD = process.env.JWT_PASSWORD || "your-secret-key";
// export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader:any = req.headers["authorization"];
//   if (!authHeader || typeof authHeader !== "string") {
//     console.log("Authorization header missing or not a string");
//      res.status(401).json({ message: "Authorization header missing or invalid format" });
//   }
//   // const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
//   const token = authHeader.split(" ")[1];
//   // Log the token for debugging
//   console.log("Token received:", token);
//   try {
//     const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };
//     // Log the decoded token for debugging
//     console.log("Decoded token:", decoded);
//     if (typeof decoded === "string" || !("id" in decoded)) {
//       console.log("Invalid token or missing id in decoded token");
//        res.status(403).json({ message: "Invalid token" });
//     }
//     req.userId = (decoded as JwtPayload).id;  // Attach userId to request
//     console.log("Token verified. UserId:", req.userId);  // Log decoded token for debugging
//     next();  // Proceed to the next middleware or route handler
//   } catch (err:any) {
//     console.log("Error verifying token:", err.message);
//      res.status(403).json({ message: "Invalid or expired token" });
//   }
// };
