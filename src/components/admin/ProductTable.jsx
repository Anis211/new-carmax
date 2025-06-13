import React, { useEffect } from "react";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { AnimatePresence, motion, animate } from "motion/react";
import FiltersPanel from "./details/FiltersPanel";
import CustomCheckbox from "../custom/CustomCheckbox";
import CheckboxGroup from "./details/CheckBox";
import InputField from "./details/InputField";
import FileUpload from "./details/FileUpload";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["White", "Black", "Blue", "Green", "Red", "Yellow"];

const ProductTable = ({
  products,
  searchQuery,
  setSearchQuery,
  setActiveTab1,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { edgestore } = useEdgeStore();

  const [isAll, setIsAll] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeCount, setSizeCount] = useState({});
  const [images, setImages] = useState([]);

  const handleChangeProduct = async (e) => {
    e.preventDefault();

    try {
      let newImages = editingProduct.images;

      if (images.length !== 0) {
        await editingProduct.images.map(
          async (item, index) =>
            await edgestore.publicFiles.delete({ url: item })
        );

        newImages = await Promise.all(
          images.map(async (file) => {
            const res = await edgestore.publicFiles.upload({ file });
            return res.url; // Collect the URL of each uploaded file
          })
        );
      }

      const response = await fetch(`/api/add-product`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newProduct: editingProduct,
          sizes: sizeCount,
          images: newImages,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("File update failed:", error);
    }

    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Function to handle checkbox changes
  const handleChecked = (value) => {
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        // If already selected, remove it
        return prev.filter((item) => item !== value);
      } else {
        // Otherwise, add it
        return [...prev, value];
      }
    });
  };

  const handleDelete = async () => {
    const prods = filteredProducts.filter((item) =>
      selectedOptions.includes(item._id)
    );

    let images = [];
    prods.map((prod) => (images = [...images, ...prod.images]));

    try {
      const response = await fetch(`/api/add-product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: selectedOptions,
        }),
      });

      const data = await response.json();

      images.map(
        async (item, index) => await edgestore.publicFiles.delete({ url: item })
      );

      if (data.success) {
        // Remove the deleted product from the state
        setFilteredProducts((prevProducts) =>
          prevProducts.filter(
            (product) => !selectedOptions.includes(product._id)
          )
        );
      } else {
        console.error("Failed to delete product:", data.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSingleDelete = async (id, images) => {
    try {
      const response = await fetch(`/api/add-product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: [id],
        }),
      });

      const data = await response.json();

      images.map(
        async (item, index) => await edgestore.publicFiles.delete({ url: item })
      );

      if (data.success) {
        // Remove the deleted product from the state
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      } else {
        console.error("Failed to delete product:", data.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleApplyFilters = (filters) => {
    const { priceRange, selectedCategories, selectedBrands, stockStatus } =
      filters;

    let filtered = products.filter((product) => {
      const priceMatch =
        parseFloat(product.price) >= priceRange[0] &&
        parseFloat(product.price) <= priceRange[1];
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const stockMatch =
        stockStatus === "all" ||
        (stockStatus === "in_stock" && product.stock > 0) ||
        (stockStatus === "low_stock" &&
          product.stock > 0 &&
          product.stock <= 20) ||
        (stockStatus === "out_of_stock" && product.stock === 0);

      return priceMatch && categoryMatch && brandMatch && stockMatch;
    });

    setFilteredProducts(filtered);
    setShowFilterPanel(false);
  };

  useEffect(() => {
    const change = async () => {
      const first = async () => {
        setFilteredProducts([]);
      };
      const second = async () => {
        setFilteredProducts(
          products.filter(
            (product) =>
              product.productName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      };

      animate("#tb", {
        y: [0, 60],
        opacity: [1, 0],
        transition: {
          duration: 0.8,
          type: "spring",
          times: [0, 1],
        },
      });
      await first();

      await second();
      animate("#tb", {
        y: [-60, 0],
        opacity: [0, 1],
        transition: {
          duration: 0.8,
          type: "spring",
          times: [0, 1],
        },
      });
    };

    change();
  }, [products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.sku.includes(searchQuery))
    );
  }, [products, searchQuery]);

  return (
    <div className="bg-white shadow border-b border-gray-200 rounded-lg">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center md:px-6 px-3 py-4 bg-gray-50">
        <input
          type="text"
          placeholder="Search products by SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-row gap-3">
          <button className="button my-auto" onClick={() => handleDelete()}>
            {/* Top SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 69 14"
              className="svgIcon bin-top"
            >
              <g clipPath="url(#clip0_35_24)">
                <path
                  fill="black"
                  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_35_24">
                  <rect fill="white" height="14" width="69" />
                </clipPath>
              </defs>
            </svg>

            {/* Bottom SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 69 57"
              className="svgIcon bin-bottom"
            >
              <g clipPath="url(#clip0_35_22)">
                <path
                  fill="black"
                  d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_35_22">
                  <rect fill="white" height="57" width="69" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <div>
            <button
              className="noselect button1"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <span className="text">Filter</span>
              <span className="icon">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 22h20L12 2z" />
                </svg>
                <img
                  src="filter.png"
                  rel="image"
                  className="w-5 h-5 buttonSpan"
                />
              </span>
            </button>
            <AnimatePresence>
              {showFilterPanel && (
                <FiltersPanel onApplyFilters={handleApplyFilters} />
              )}
            </AnimatePresence>
          </div>
          <button
            className="noselect button1"
            onClick={() => setActiveTab1("add-product")}
          >
            <span className="text">Add</span>
            <span className="icon">
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
              <span className="buttonSpan">+</span>
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll md:overflow-x-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <CustomCheckbox
                checked={isAll}
                onChange={() => {
                  if (!isAll) {
                    setIsAll(true);
                    setSelectedOptions(
                      filteredProducts.map((product) => product._id)
                    );
                  } else {
                    setIsAll(false);
                    setSelectedOptions([]);
                  }
                }}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SKU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Brand
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <motion.tbody id="tb" className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product, index) => (
            <motion.tr
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, type: "spring" }}
              key={product.id}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <CustomCheckbox
                  key={index}
                  checked={selectedOptions.includes(product._id)}
                  onChange={() => handleChecked(product._id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-md object-cover bg-black"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.sku}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.price}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.stock}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.brand}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 flex flex-row gap-2 whitespace-nowrap text-right text-sm font-medium flex justify-end">
                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setEditingProduct(product);
                    setSizeCount(product.sizes);
                    setSelectedSizes(Object.keys(product.sizes));
                  }}
                  className="editBtn"
                >
                  {/* SVG Icon */}
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </button>
                <button
                  className="button"
                  onClick={() =>
                    handleSingleDelete(product._id, product.images)
                  }
                >
                  {/* Top SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 69 14"
                    className="svgIcon bin-top"
                  >
                    <g clipPath="url(#clip0_35_24)">
                      <path
                        fill="black"
                        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_35_24">
                        <rect fill="white" height="14" width="69" />
                      </clipPath>
                    </defs>
                  </svg>

                  {/* Bottom SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 69 57"
                    className="svgIcon bin-bottom"
                  >
                    <g clipPath="url(#clip0_35_22)">
                      <path
                        fill="black"
                        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_35_22">
                        <rect fill="white" height="57" width="69" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex gap-2 min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white rounded-lg p-6 w-[600px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Edit Product</h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingProduct(null);
                    }}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={editingProduct.productName}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            productName: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={editingProduct.sku}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            sku: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand
                      </label>
                      <select
                        value={editingProduct.brand}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            brand: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="BOSS">BOSS</option>
                        <option value="KEPKA">KEPKA</option>
                        <option value="DENIM CO">DENIM CO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[
                          "hoodies",
                          "pants",
                          "shirts",
                          "jackets",
                          "sweaters",
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editingProduct.status}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            status: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <CheckboxGroup
                      label="Available Colors"
                      options={colors}
                      selectedOptions={editingProduct.color}
                      onToggle={(color) =>
                        setEditingProduct((prev) => ({
                          ...prev,
                          color: color,
                        }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <CheckboxGroup
                      label="Available Sizes"
                      options={sizes}
                      selectedOptions={selectedSizes}
                      onToggle={handleSizeToggle}
                    />
                    <div className="flex flex-row flex-wrap gap-2">
                      <AnimatePresence>
                        {selectedSizes.length > 0 &&
                          selectedSizes.map((size, index) => (
                            <motion.div
                              initial={{ opacity: 0, x: 60 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 60 }}
                              transition={{ duration: 0.6, type: "spring" }}
                            >
                              <InputField
                                key={index}
                                label={`Number of ${size} cothes: `}
                                id={size}
                                type="number"
                                className="w-[25%]"
                                value={sizeCount[size]}
                                onChange={(e) =>
                                  setSizeCount((prev) => ({
                                    ...prev,
                                    [size]: e.target.value,
                                  }))
                                }
                                required
                              />
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-row flex-wrap gap-2">
                        {editingProduct.images.map((item, index) => (
                          <img
                            key={index}
                            src={item}
                            alt={editingProduct.productName}
                            className="w-20 h-20 object-cover rounded-md border-2 border-black"
                          />
                        ))}
                      </div>
                      <FileUpload
                        label="Product Images"
                        setImages={setImages}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangeProduct}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 !rounded-button whitespace-nowrap"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
