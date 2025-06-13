import React, { useState } from "react";
import InputField from "./details/InputField";
import TextAreaField from "./details/TextArea";
import SelectField from "./details/SelectField";
import CheckboxGroup from "./details/CheckBox";
import FileUpload from "./details/FileUpload";
import Button from "./details/Button";
import { useEdgeStore } from "@/lib/edgestore";

const AddProductForm = ({
  setActiveTab1,
  setError,
  setLoading,
  setChange,
  setSuccess,
}) => {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeCount, setSizeCount] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [images, setImages] = useState([]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["White", "Black", "Blue", "Green", "Red", "Yellow"];

  const { edgestore } = useEdgeStore();

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (images.length === 0) {
        alert("Please select at least one image");
        return;
      }

      const uploadedFiles = await Promise.all(
        images.map(async (file) => {
          const res = await edgestore.publicFiles.upload({ file });
          return res.url; // Collect the URL of each uploaded file
        })
      );

      const response = await fetch("/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: productName,
          sku: sku,
          price: price,
          brand: brand,
          category: category,
          color: selectedColor,
          images: uploadedFiles,
          sizes: sizeCount,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setChange(true);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setActiveTab1("products");
      }
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details to add a new product to your catalog.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
        {/* Product Name and SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Product Name"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <InputField
            label="SKU"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <TextAreaField
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        {/* Price and Sale Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Regular Price"
            id="price"
            type="number"
            prefix="$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Brand and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Select brand"
            options={[
              "Calvin Klein",
              "BOSS",
              "ZARA",
              "Levi's",
              "Tommy Hilfiger",
            ]}
          />
          <SelectField
            label="Category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
            options={["hoodies", "pants", "shirts", "jackets", "sweaters"]}
          />
        </div>

        {/* Sizes */}
        <CheckboxGroup
          label="Available Sizes"
          options={sizes}
          selectedOptions={selectedSizes}
          onToggle={handleSizeToggle}
        />

        {selectedSizes.length > 0 &&
          selectedSizes.map((size, index) => (
            <InputField
              key={index}
              label={`Number of ${size} cothes: `}
              id={size}
              type="number"
              value={sizeCount[size]}
              onChange={(e) =>
                setSizeCount((prev) => ({ ...prev, [size]: e.target.value }))
              }
              required
            />
          ))}

        {/* Colors */}
        <CheckboxGroup
          label="Available Colors"
          options={colors}
          selectedOptions={selectedColor}
          onToggle={handleColorToggle}
        />

        {/* Product Images */}
        <FileUpload label="Product Images" setImages={setImages} />

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setActiveTab1("products");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
