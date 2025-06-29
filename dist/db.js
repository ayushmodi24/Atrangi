"use strict";
// import mongoose, { model, Schema } from "mongoose";
// mongoose.connect("mongodb://localhost:27017/atrangi")
// // const UserSchema = new Schema({
// //     username: { type: String, unique: true },
// //     password: String
// // })
// // export const UserModel = model("User", UserSchema);
// const reviewSchema = new Schema(
//     {
//         comment: String,
//         rating: {
//             type: Number,
//             min: 1,
//             max: 5
//         },
//         created: {
//             type: Date,
//             default: Date.now(),
//         },
//         author:
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         refId: {
//             type: String,
//             required: true // ID of the writer or painting
//         },
//         type: {
//             type: String,
//             enum: ["writer", "painting"],
//             required: true
//         },
//         // models/Review.ts
//         likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
//     })
// export default mongoose.model("Review", reviewSchema);
// const writerSchema = new mongoose.Schema({
//     img: [String],
//     category: String,
//     description: String,
//     likes: { type: Number, default: 0 }, // ✅ Like count
//     likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // ✅ Users who liked this writer
//   });
//   export const WriterModel = mongoose.model("Writer", writerSchema);
