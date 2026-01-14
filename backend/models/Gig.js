const mongoose = require("mongoose");

const GigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,trim:true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    OwnerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,},
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", GigSchema);
