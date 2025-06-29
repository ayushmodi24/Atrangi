"use strict";
// import { Request, Response } from "express";
// import Review from "../models/review";
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
exports.getReviewsByWriter = exports.getReviews = exports.createReview = void 0;
const review_1 = __importDefault(require("../models/review"));
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, rating, refId, type } = req.body;
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const newReview = yield review_1.default.create({
            comment,
            rating,
            author: userId,
            refId,
            type
        });
        const populated = yield review_1.default.findById(newReview._id).populate("author", "username");
        res.status(201).json({ success: true, data: populated });
        return;
    }
    catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createReview = createReview;
const getReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, type } = req.params;
        const reviews = yield review_1.default.find({ refId: id, type }).populate("author", "username");
        res.json(reviews);
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getReviews = getReviews;
const getReviewsByWriter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const writerId = req.params.writerId;
    try {
        const reviews = yield review_1.default.find({ refId: writerId, type: "writer" }).populate("author", "username");
        res.json(reviews);
    }
    catch (error) {
        console.error("Error fetching writer reviews:", error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});
exports.getReviewsByWriter = getReviewsByWriter;
