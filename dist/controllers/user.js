"use strict";
// import { Request, Response, NextFunction } from "express";
// import User from "../models/user";
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
exports.getUserFavourites = exports.toggleFavourite = void 0;
const painting_1 = __importDefault(require("../models/painting"));
const user_1 = __importDefault(require("../models/user"));
const toggleFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const paintingId = req.params.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const painting = yield painting_1.default.findById(paintingId);
        if (!painting) {
            res.status(404).json({ message: "Painting not found" });
            return;
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const index = user.favourites.indexOf(paintingId);
        const likedIndex = painting.likedBy.indexOf(userId);
        if (index > -1) {
            user.favourites.splice(index, 1);
        }
        else {
            user.favourites.push(paintingId);
        }
        // if (likedIndex > -1) {
        //   painting.likedBy.splice(likedIndex, 1);
        // } else {
        //   painting.likedBy.push(userId);
        // }
        yield user.save();
        yield painting.save();
        res.status(200).json({
            message: "Painting favourite toggled",
            // userFavourites: user.favourites,
            // likedBy: painting.likedBy
            favourites: user.favourites,
        });
        return;
    }
    catch (error) {
        console.error("Error toggling painting favourite:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.toggleFavourite = toggleFavourite;
const getUserFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.user._id).populate("favourites");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({ favourites: user.favourites });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUserFavourites = getUserFavourites;
