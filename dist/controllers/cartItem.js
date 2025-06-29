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
exports.deleteCartItem = exports.getCartItems = exports.addToCart = void 0;
const cartItem_1 = __importDefault(require("../models/cartItem"));
const painting_1 = __importDefault(require("../models/painting"));
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { paintingId } = req.body;
    if (!paintingId) {
        res.status(400).json({ message: "paintingId required" });
        return;
    }
    try {
        const painting = yield painting_1.default.findById(paintingId);
        if (!painting) {
            res.status(404).json({ message: "Painting not found" });
            return;
        }
        const existing = yield cartItem_1.default.findOne({ user: userId, painting: paintingId });
        if (existing) {
            res.status(200).json({ message: "Already in cart" });
            return;
        }
        const CartItem = new cartItem_1.default({ user: userId, painting: paintingId });
        yield CartItem.save();
        res.status(201).json(CartItem);
    }
    catch (err) {
        console.error("Add to cart error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addToCart = addToCart;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield cartItem_1.default.find({ user: req.user.id }).populate("painting");
        res.json(items.map(item => item.painting));
    }
    catch (error) {
        console.error("Error getting cart items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCartItems = getCartItems;
const deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // assuming req.user is set by auth middleware
        const paintingId = req.params.id;
        const deleted = yield cartItem_1.default.findOneAndDelete({
            user: userId,
            painting: paintingId
        });
        if (!deleted) {
            res.status(404).json({ message: "Item not found in cart" });
            return;
        }
        res.json({ message: "Item removed from cart" });
    }
    catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCartItem = deleteCartItem;
