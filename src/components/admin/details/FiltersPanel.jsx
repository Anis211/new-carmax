import React, { useState } from "react";
import { motion } from "motion/react";
import CustomCheckbox from "@/components/custom/CustomCheckbox";

const categories = ["T-Shirts", "Jeans", "Jackets", "Accessories", "Shirts"];
const brands = ["Calvin Klein", "BOSS", "ZARA", "Levi's", "Tommy Hilfiger"];

const FiltersPanel = ({ onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [stockStatus, setStockStatus] = useState("all");

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      selectedCategories,
      selectedBrands,
      stockStatus,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="absolute right-20 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
    >
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>

        {/* Price Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <input
            type="range"
            min={0}
            max={200}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label key={index} className="container flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <div className="checkmark"></div>
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brands
          </label>
          <div className="space-y-2">
            {brands.map((brand, index) => (
              <label key={index} className="container flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <div className="checkmark"></div>
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Status
          </label>
          <div className="space-y-2">
            {[
              { value: "all", label: "All" },
              { value: "in_stock", label: "In Stock" },
              { value: "low_stock", label: "Low Stock" },
              { value: "out_of_stock", label: "Out of Stock" },
            ].map(({ value, label }) => (
              <label key={value} className="container flex items-center">
                <input
                  type="radio"
                  name="stockStatus"
                  value={value}
                  checked={stockStatus === value}
                  onChange={() => setStockStatus(value)}
                />
                <div className="checkmark"></div>
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setPriceRange([0, 200]);
              setSelectedCategories([]);
              setSelectedBrands([]);
              setStockStatus("all");
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FiltersPanel;
