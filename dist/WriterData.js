"use strict";
// // seedWriters.ts (or in your main server file temporarily)
// import mongoose from "mongoose";
// import { WriterModel } from "./db"; // Adjust path as needed
// const WriterData = [
//   {
//     img: ["/img/p1.jpg"],
//     category: "Poetry",
//     description: "A poem about hope and light."
//   },
//   {
//     img: ["/img/p2a.jpg", "/img/p2b.jpg"],
//     category: "Poetry",
//     description: "न सूरज सा तेज,\nन आंधी का वेग, फिर भी चलूंगी,\nये मेरा प्रण-निवेश।\nवक्त की चाल को मोड़ दिखाऊंगी,\nअपने दौर को खुद ले आऊंगी। 🍃"
//   }
// ];
// const seedWriters = async () => {
//   await mongoose.connect("mongodb://localhost:27017/atrangi");
//   await WriterModel.deleteMany(); // optional: clears existing writers
//   await WriterModel.insertMany(WriterData);
//   console.log("✅ Writers seeded successfully");
//   process.exit();
// };
// seedWriters();
