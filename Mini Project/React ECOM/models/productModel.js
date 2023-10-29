import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      //required: false,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    foodType: {
      type: String,
    },
    flavor: {
      type: String,
    },
    color: {
      type: String,
    },
    orgin: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);