import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import Total from "@/models/Total";

// Connect to MongoDB when the API route is accessed
connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { countl, countr } = req.query;
    try {
      // Fetch all products from the database
      const products = await Product.find({}).skip(countl).limit(countr);

      // Return the products as a JSON response
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { productName, sku, price, brand, category, color, images, sizes } =
        req.body;

      if (
        !productName ||
        !sku ||
        !price ||
        !category ||
        !brand ||
        !color ||
        !images ||
        !sizes
      ) {
        console.log("not all");
        return res.status(400).json({ error: "All fields are required" });
      }

      let stock = 0;
      Object.values(sizes).map((item) => (stock += Number(item)));

      // Create a new user
      const newProduct = new Product({
        productName,
        sku,
        price,
        stock,
        brand,
        category,
        color,
        images,
        sizes,
      });
      await newProduct.save();

      const count = await Total.findById("680d9646e345aea0f2104a0f");

      await Total.findByIdAndUpdate(
        "680d9646e345aea0f2104a0f",
        { totalCount: count.totalCount + 1 },
        { new: true }
      );

      // Return success response
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const { ids } = req.body;

    try {
      // Delete the product by ID
      await ids.map(async (id) => await Product.findByIdAndDelete(id));

      const count = await Total.findById("680d9646e345aea0f2104a0f");

      await Total.findByIdAndUpdate(
        "680d9646e345aea0f2104a0f",
        { totalCount: count.totalCount - ids.length },
        { new: true }
      );

      // Respond with success message
      res
        .status(201)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { newProduct, sizes, images } = req.body;

    let stock = 0;
    Object.values(sizes).map((item) => (stock += Number(item)));

    try {
      // Update the file metadata in MongoDB
      const updatedFile = await Product.findByIdAndUpdate(
        newProduct._id,
        { ...newProduct, images: images, sizes: sizes, stock: stock },
        { new: true } // Return the updated document
      );

      if (!updatedFile) {
        return res.status(404).json({ error: "File not found" });
      }

      res
        .status(200)
        .json({ message: "File updated successfully", file: updatedFile });
    } catch (error) {
      res.status(500).json({ error: "Failed to update file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
