"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: 3000,
    MONGODB_URI: "mongodb://localhost:27017/atrangi1",
    JWT_SECRET: process.env.JWT_SECRET || "123456",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173"
};
