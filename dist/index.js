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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config/config");
const db_1 = __importDefault(require("./db"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const db_2 = require("./db");
const app = (0, express_1.default)();
const PORT = 3000;
// app.use(cors());
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/atrangi")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    likedWriters: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Writer' }]
});
const UserModel = mongoose_1.default.model("User", userSchema);
// Test route
app.get("/", (_req, res) => {
    res.send("👋 Hello from backend");
});
app.post("/home/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const username = (_a = req.body.username) === null || _a === void 0 ? void 0 : _a.trim();
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
    }
    try {
        const existingUser = yield UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({ message: "Username already exists." });
        }
        const newUser = yield UserModel.create({ username, password });
        // Automatically generate token on signup
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, config_1.JWT_PASSWORD);
        res.status(201).json({ message: "Signup successful", token });
    }
    catch (e) {
        console.error("Signup error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.post("/home/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
// POST /writer/like/:writerId
app.post("/writer/like/:writerId", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { writerId } = req.params;
        const userId = req.userId;
        const writer = yield db_2.WriterModel.findById(writerId);
        if (!writer) {
            res.status(404).json({ message: "Writer not found" });
            return;
        }
        const index = writer.likedBy.indexOf(userId);
        let message;
        if (index === -1) {
            writer.likedBy.push(userId);
            writer.likes += 1;
            message = "Liked";
        }
        else {
            writer.likedBy.splice(index, 1);
            writer.likes -= 1;
            message = "Unliked";
        }
        yield writer.save();
        res.status(200).json({
            message,
            likeCount: writer.likes,
            likedBy: writer.likedBy,
        });
        return;
    }
    catch (error) {
        console.error("Error toggling writer like:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}));
app.post("/review", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received review post request", req.body);
    // const { comment, rating, authorId, refId, type } = req.body;
    const { comment, rating, refId, type } = req.body;
    const userId = req.userId;
    try {
        const newReview = new db_1.default({
            comment,
            rating,
            author: userId,
            refId,
            type,
        });
        yield newReview.save();
        // Populate the author's username before sending the response
        const populated = yield newReview.populate("author", "username");
        res.status(201).json({
            message: "Review added successfully",
            review: populated,
        });
    }
    catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/reviews/painting/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paintingId = req.params.id;
    try {
        const reviews = yield db_1.default.find({ refId: paintingId, type: "painting" }).populate("author");
        res.status(200).json({ reviews });
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/reviews/writer/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const writerId = req.params.id;
    try {
        const reviews = yield db_1.default.find({ refId: writerId, type: "writer" }).populate("author");
        res.status(200).json({ reviews });
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
