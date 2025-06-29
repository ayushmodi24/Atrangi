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
const mongoose_1 = __importDefault(require("mongoose"));
const painting_1 = __importDefault(require("../models/painting"));
const config_1 = __importDefault(require("../config/config"));
const paintingData = [
    // { imgUrl: ["/img/a1.jpg"], category: "POSTERS" },
    // { imgUrl: "img/a2.jpg", category: "POLAROIDS" },
    // { imgUrl: "img/a3.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a4.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a5.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a6.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a7.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a8.png", category: "KEYCHAINS" },
    // { imgUrl: "img/a9.png", category: "KEYCHAINS" },
    // { imgUrl: "img/a10.png", category: "KEYCHAINS" },
    // { imgUrl: "img/a11.png", category: "KEYCHAINS" },
    // { imgUrl: "img/a12.png", category: "POLAROIDS" },
    // { imgUrl: "img/a13.png", category: "POLAROIDS" },
    // { imgUrl: "img/a14.png", category: "POLAROIDS" },
    // { imgUrl: "img/a15.png", category: "POLAROIDS" },
    // { imgUrl: "img/a16.png", category: "BOOKMARKS" },
    // { imgUrl: "img/a17.png", category: "BOOKMARKS" },
    // { imgUrl: "img/a18.png", category: "BOOKMARKS" },
    // { imgUrl: "img/a19.png", category: "BOOKMARKS" },
    // { imgUrl: "img/a20.png", category: "POSTERS" },
    // { imgUrl: "img/a21.png", category: "POSTERS" },
    // { imgUrl: "img/a22.png", category: "POSTERS" },
    // { imgUrl: "img/a23.png", category: "POSTERS" },
    // { imgUrl: "img/a24.png", category: "POSTERS" },
    // { imgUrl: "img/a25.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a26.png", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a27.jpg", category: "POSTERS" },
    // { imgUrl: "img/a28.jpg", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a29.jpg", category: "POSTERS" },
    // { imgUrl: "img/a30.jpg", category: "PORTRAIT & SKETCHES" },
    // { imgUrl: "img/a31.jpg", category: "POSTERS" },
    // { imgUrl: "img/a32.jpg", category: "PORTRAIT & SKETCHES" }
    { imgUrl: ["/img/a1.jpg"], category: "POSTERS" },
    { imgUrl: ["/img/a2.jpg"], category: "POLAROIDS" },
    { imgUrl: ["/img/a3.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a4.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a5.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a6.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a7.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a8.png"], category: "KEYCHAINS" },
    { imgUrl: ["/img/a9.png"], category: "KEYCHAINS" },
    { imgUrl: ["/img/a10.png"], category: "KEYCHAINS" },
    { imgUrl: ["/img/a11.png"], category: "KEYCHAINS" },
    { imgUrl: ["/img/a12.png"], category: "POLAROIDS" },
    { imgUrl: ["/img/a13.png"], category: "POLAROIDS" },
    { imgUrl: ["/img/a14.png"], category: "POLAROIDS" },
    { imgUrl: ["/img/a15.png"], category: "POLAROIDS" },
    { imgUrl: ["/img/a16.png"], category: "BOOKMARKS" },
    { imgUrl: ["/img/a17.png"], category: "BOOKMARKS" },
    { imgUrl: ["/img/a18.png"], category: "BOOKMARKS" },
    { imgUrl: ["/img/a19.png"], category: "BOOKMARKS" },
    { imgUrl: ["/img/a20.png"], category: "POSTERS" },
    { imgUrl: ["/img/a21.png"], category: "POSTERS" },
    { imgUrl: ["/img/a22.png"], category: "POSTERS" },
    { imgUrl: ["/img/a23.png"], category: "POSTERS" },
    { imgUrl: ["/img/a24.png"], category: "POSTERS" },
    { imgUrl: ["/img/a25.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a26.png"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a27.jpg"], category: "POSTERS" },
    { imgUrl: ["/img/a28.jpg"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a29.jpg"], category: "POSTERS" },
    { imgUrl: ["/img/a30.jpg"], category: "PORTRAIT & SKETCHES" },
    { imgUrl: ["/img/a31.jpg"], category: "POSTERS" },
    { imgUrl: ["/img/a32.jpg"], category: "PORTRAIT & SKETCHES" }
];
const seed2 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.MONGODB_URI);
        yield painting_1.default.deleteMany();
        yield painting_1.default.insertMany(paintingData);
        console.log("✅ Database seeded successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
});
seed2();
