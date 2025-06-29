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
const writer_1 = __importDefault(require("../models/writer"));
const config_1 = __importDefault(require("../config/config"));
const writerData = [
    {
        img: ["/img/p1.jpg"],
        category: "Poetry",
        description: "A poem about hope and light."
    },
    {
        img: ["/img/p2a.jpg", "/img/p2b.jpg"],
        category: "Poetry",
        description: "न सूरज सा तेज,\nन आंधी का वेग, फिर भी चलूंगी,\nये मेरा प्रण-निवेश।\nवक्त की चाल को मोड़ दिखाऊंगी,\nअपने दौर को खुद ले आऊंगी। 🍃"
    }
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.MONGODB_URI);
        yield writer_1.default.deleteMany();
        yield writer_1.default.insertMany(writerData);
        console.log("✅ Database seeded successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
});
seed();
