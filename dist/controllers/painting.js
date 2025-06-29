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
exports.getPaintingByID = exports.getPaintings = exports.toggleFavourite = void 0;
const painting_1 = __importDefault(require("../models/painting"));
const user_1 = __importDefault(require("../models/user"));
const toggleFavourite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const paintingId = req.params.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const painting = yield painting_1.default.findById(paintingId);
        if (!painting) {
            res.status(404).json({ message: "Painting not found" });
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const index = user.favourites.indexOf(paintingId);
        const likedIndex = painting.likedBy.indexOf(userId);
        if (index > -1) {
            user.favourites.splice(index, 1);
        }
        else {
            user.favourites.push(paintingId);
        }
        if (likedIndex > -1) {
            painting.likedBy.splice(likedIndex, 1);
        }
        else {
            painting.likedBy.push(userId);
        }
        yield user.save();
        yield painting.save();
        res.status(200).json({
            message: "Painting favourite toggled",
            userFavourites: user.favourites,
            likedBy: painting.likedBy
        });
    }
    catch (error) {
        console.error("Error toggling painting favourite:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.toggleFavourite = toggleFavourite;
const getPaintings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== "ALL ARTWORKS") {
            query = { category };
        }
        const paintings = yield painting_1.default.find();
        res.json(paintings);
    }
    catch (error) {
        console.error("Error fetching paintings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPaintings = getPaintings;
const getPaintingByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const painting = yield painting_1.default.findById(req.params.id);
        if (!painting) {
            res.status(404).json({ message: "Painting not found" });
            return;
        }
        res.json(painting);
    }
    catch (error) {
        console.error("Error fetching painting by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPaintingByID = getPaintingByID;
