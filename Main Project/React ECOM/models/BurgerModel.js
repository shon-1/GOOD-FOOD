import mongoose from "mongoose";

const { Schema, model } = mongoose;

const burgerOrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: [String], // Assuming image URLs are stored as strings
    required: true,
  },
});

const BurgerOrder = model("BurgerOrder", burgerOrderSchema);

export default BurgerOrder;
