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
exports.likeWriter = exports.getWriterById = exports.getWriters = void 0;
const writer_1 = __importDefault(require("../models/writer"));
const getWriters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== "All") {
            query = { category };
        }
        const writers = yield writer_1.default.find();
        res.json(writers);
    }
    catch (error) {
        console.error("Error fetching writers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getWriters = getWriters;
const getWriterById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const writer = yield writer_1.default.findById(req.params.id);
        if (!writer) {
            res.status(404).json({ message: "Writer not found" });
            return;
        }
        res.json(writer);
    }
    catch (error) {
        console.error("Error fetching writer by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getWriterById = getWriterById;
const likeWriter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { writerId } = req.params;
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const writer = yield writer_1.default.findById(writerId);
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
        res.json({ message, likeCount: writer.likes });
    }
    catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.likeWriter = likeWriter;
