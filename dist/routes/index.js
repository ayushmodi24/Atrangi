"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth"));
const writerController = __importStar(require("../controllers/writer"));
const paintingController = __importStar(require("../controllers/painting"));
const reviewController = __importStar(require("../controllers/review"));
const auth_1 = require("../middleware/auth");
const cartItemController = __importStar(require("../controllers/cartItem"));
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
// Auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
// Add these routes with proper imports
router.post("/favourite/:id", auth_1.authMiddleware, user_1.toggleFavourite);
router.get("/favourites", auth_1.authMiddleware, user_1.getUserFavourites);
// Writer routes
router.get("/writers", writerController.getWriters);
router.get("/writers/:id", writerController.getWriterById);
router.post("/writers/:writerId/like", auth_1.authMiddleware, writerController.likeWriter);
router.get("/paintings", paintingController.getPaintings);
router.get("/paintings/:id", paintingController.getPaintingByID);
// router.post("/paintings/:id/favourite", authMiddleware, toggleFavourite);
// router.post("/favourite/:id", authMiddleware, toggleFavourite);
// router.post("/favourite/:id", authMiddleware, toggleFavourite);
// router.get("/favourites", authMiddleware, getUserFavourites);
// Review routes
router.post("/reviews", auth_1.authMiddleware, reviewController.createReview);
router.get("/reviews/:id/:type", reviewController.getReviews);
// router.post("/reviews/:reviewId/like", authMiddleware, reviewController.likeReview);
router.get("/reviews/writer/:writerId", reviewController.getReviewsByWriter); // Added this line
// Add to Cart
router.post("/cart", auth_1.authMiddleware, cartItemController.addToCart);
router.delete("/cart/:id", auth_1.authMiddleware, cartItemController.deleteCartItem);
router.get("/cart", auth_1.authMiddleware, cartItemController.getCartItems);
exports.default = router; // ✅ This is what your main file expects
