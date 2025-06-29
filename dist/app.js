"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Allow multiple origins (you can adjust this for production)
// const allowedOrigins = ['http://localhost:5174'];
const allowedOrigins = [
    'http://localhost:5173', // Add your frontend's actual origin
    'http://localhost:5174' // Keep existing if needed
];
app.use("/img", express_1.default.static("img"));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
app.use("/", routes_1.default);
// Connect to database
mongoose_1.default
    .connect(process.env.DB_URI || "mongodb://localhost:27017/atrangi1")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Database connection error:", error));
// Server setup
app.listen(3000, () => {
    console.log("Server is running...");
});
app.get("/", (req, res) => {
    res.send("Hello");
});
