import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    customerId: { type: String, required: true },
    customerData: {
      name: String,
      phone: String,
      email: String,
    },
    address: {
      city: { type: String, default: "Бишкек" },
      street: { type: String, default: "Киевская" },
      building: { type: String, default: "95" },
      apartment: { type: String, default: "" },
    },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["card", "cash", "mbank"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      required: true,
    },
    paymentData: {
      number: String,
      transactionId: { type: String, required: true },
    },
    shipingCost: { type: Number, default: 0 },
    shippingMethod: {
      type: String,
      enum: ["pickup", "courier"],
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["Delivered", "Shipped", "Processing", "Canceled"],
      default: "Processing",
    },
    shippingData: {
      trackNum: { type: String, default: "Processing" },
      estimatedDate: { type: String, default: "Processing" },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
