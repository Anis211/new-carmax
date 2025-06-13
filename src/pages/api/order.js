import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

// Connect to MongoDB when the API route is accessed
connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        user,
        customerData,
        orderId,
        address,
        items,
        paymentMethod,
        paymentStatus,
        paymentData,
        shippingCost,
        shippingMethod,
      } = req.body;

      console.log(
        user._id,
        customerData,
        orderId,
        address,
        items,
        paymentMethod,
        paymentStatus,
        paymentData,
        shippingCost,
        shippingMethod
      );

      // Create a new user
      const newOrder = new Order(
        shippingMethod == "courier"
          ? {
              orderId: orderId,
              customerId: user._id,
              customerData: customerData,
              address: address,
              items: items,
              paymentMethod: paymentMethod,
              paymentStatus: paymentStatus,
              paymentData: paymentData,
              shippingCost: shippingCost,
              shippingMethod: shippingMethod,
            }
          : {
              orderId: orderId,
              customerId: user._id,
              customerData: customerData,
              items: items,
              paymentMethod: paymentMethod,
              paymentStatus: paymentStatus,
              paymentData: paymentData,
              shippingCost: shippingCost,
              shippingMethod: shippingMethod,
            }
      );

      await newOrder.save();

      await Promise.all(
        items.map(async (item) => {
          const pr = await Product.findById(item.productId);
          const prev = pr.toObject();

          const updatedProduct = await Product.findByIdAndUpdate(
            prev._id,
            {
              ...prev,
              stock: prev.stock - item.quantity,
              sizes: {
                ...prev.sizes,
                [item.size]: String(
                  Number(prev.sizes[item.size]) - item.quantity
                ),
              },
              status:
                prev.stock - item.quantity < 15 &&
                prev.stock - item.quantity != 0
                  ? "Low Stock"
                  : prev.stock - item.quantity == 0
                  ? "Out of Stock"
                  : "Active",
            },
            { new: true }
          );

          console.log(updatedProduct);
        })
      );

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { ...user, orders: [...user.orders, orderId] },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return success response
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const { email, countl, countr } = req.query;

    try {
      if (email === "admin") {
        const orders = await Order.find({}).skip(countl).limit(countr);
        res.status(200).json(orders);
      } else {
        const user = await User.findOne({ email: email });
        const orders = await Order.find({ orderId: { $in: user.orders } });

        res.status(200).json(orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { status, order } = req.body;

    try {
      const newOrder = await Order.findByIdAndUpdate(
        order._id,
        { ...order, shippingStatus: status },
        { new: true }
      );

      res.status(200).json(newOrder);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
