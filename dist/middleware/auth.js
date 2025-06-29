"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // const token = req.headers.authorization?.split(' ')[1];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authentication required" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Authentication required" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        // (req as any).userId = decoded.id;
        req.user = { id: decoded.id };
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const authHeader = req.headers["authorization"];
//   console.log("AUTH HEADER:", authHeader); // ✅ log
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//      res.status(401).json({ message: "Authentication required" });
//      return;
//   }
//   const token = authHeader.split(" ")[1];
//   console.log("TOKEN:", token); // ✅ log
//   try {
//     const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
//     console.log("DECODED:", decoded); // ✅ log
//     (req as any).userId = decoded.id;
//     next();
//   } catch (err) {
//     console.error("JWT ERROR:", err); // ✅ log error details
//     res.status(403).json({ message: "Invalid token" });
//   }
// };
// // auth.js
// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//      res.status(401).json({ message: "Authentication required" });
//      return;
//   }
//   const token = authHeader.split(" ")[1];
//   console.log("Received Token:", token);
//   try {
//     const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
//     console.log("Decoded Token:", decoded);
//     (req as any).userId = decoded.id;
//     next();
//   } catch (err) {
//     console.error("JWT ERROR:", err);
//     res.status(403).json({ message: "Invalid token" });
//   }
// };
