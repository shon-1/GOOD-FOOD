import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  }
});

export default mongoose.model("Delivery", DeliverySchema);

