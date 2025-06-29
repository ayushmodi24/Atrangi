"use strict";
// import mongoose, { Schema } from "mongoose";
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
// const userSchema = new Schema({
//   username: { 
//     type: String, 
//     unique: true, 
//     required: [true, 'Username is required'],
//     trim: true,
//     minlength: [3, 'Username must be at least 3 characters'],
//     maxlength: [30, 'Username cannot exceed 30 characters']
//   },
//   _id: mongoose.Types.ObjectId,
//   email: {
//     type: String,
//     unique: true,
//     required: [true, 'Email is required'],
//     trim: true,
//     lowercase: true,
//     validate: {
//       validator: (value: string) => {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//       },
//       message: 'Please enter a valid email address'
//     }
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters'] 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   },
//   favourites: [{ type: Schema.Types.ObjectId, ref: "Painting" }],
// });
// // Update the updatedAt field before saving
// userSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });
// export default mongoose.model("User", userSchema);
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: "Please enter a valid email address",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    favourites: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Painting" }],
});
userSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
exports.default = mongoose_1.default.model("User", userSchema);
