"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Validation
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Username, email and password are required"
            });
            return;
        }
        // Password strength check
        if (password.length < 8) {
            res.status(400).json({
                message: "Password must be at least 8 characters"
            });
            return;
        }
        // Check for existing user
        const existingUser = yield user_1.default.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            const errors = {};
            if (existingUser.username === username)
                errors.username = "Username already exists";
            if (existingUser.email === email)
                errors.email = "Email already in use";
            res.status(409).json({
                message: "Conflict",
                errors
            });
            return;
        }
        // Create new user
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            username,
            email,
            password: hashedPassword
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, config_1.default.JWT_SECRET, { expiresIn: '8d' });
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.signup = signup;
// export const signin = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { usernameOrEmail, password } = req.body;
//     if (!usernameOrEmail || !password) {
//       res.status(400).json({ 
//         message: "Username/email and password are required" 
//       });
//       return;
//     }
//     // Find user
//     const user = await User.findOne({
//       $or: [
//         { username: usernameOrEmail },
//         { email: usernameOrEmail }
//       ]
//     });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       res.status(401).json({ 
//         message: "Invalid credentials" 
//       });
//       return;
//     }
//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       config.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email
//       }
//     });
//   } catch (error: any) {
//     console.error("Signin error:", error);
//     res.status(500).json({ 
//       message: "Internal server error",
//       error: error.message 
//     });
//   }
// };
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            res.status(400).json({
                message: "Username/email and password are required"
            });
            return;
        }
        // Find user by username or email
        const user = yield user_1.default.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({
                message: "Invalid credentials"
            });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.signin = signin;
