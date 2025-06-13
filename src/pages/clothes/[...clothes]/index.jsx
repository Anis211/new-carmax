import React, { useState, useEffect } from "react";
import DotWave from "@/components/custom/DotWave";
import { useRouter } from "next/router";
import useUser from "@/zustand/user";
import { AnimatePresence, motion, animate } from "motion/react";

const App = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const router = useRouter();
  const { clothes } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [chosenProduct, setChosenProduct] = useState({});
  const [once, setOnce] = useState(false);

  const liked = useUser((state) => state.liked);
  const addLiked = useUser((state) => state.addLiked);
  const removeLiked = useUser((state) => state.removeLiked);

  const addCart = useUser((state) => state.addCart);
  const clearCart = useUser((state) => state.clearCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`/api/add-product`); // Call the API route
        if (!response1.ok) throw new Error("Failed to fetch products");
        const data1 = await response1.json();
        setAllProducts(data1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    !once && fetchData();
    setOnce(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (clothes != undefined) {
          const response = await fetch(`/api/product-details?sku=${clothes}`, {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache", // Prevent caching
              Pragma: "no-cache", // For older HTTP/1.0 servers
              Expires: "0", // Ensure no expiration
            },
          });

          if (!response.ok) throw new Error("Failed to fetch users");

          const data = await response.json();
          console.log(data);
          setProducts(data);

          setChosenProduct(data[0]);
          setSelectedColor(data[0].color);
          setSelectedImage(data[0].images[0]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clothes]);

  const colors = {
    White: "#ffffff",
    Black: "#000000",
    Blue: "#0b5394",
    Green: "#6aa84f",
    Red: "#cc0000",
    Yellow: "#ffff00",
  };

  const productSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const incrementQuantity = () => {
    animate("#quantity", {
      y: [0, 15],
      opacity: [1, 0],
      transition: {
        duration: 0.6,
        type: "spring",
        times: [0, 1],
      },
    });
    setQuantity(quantity + 1);
    animate("#quantity", {
      y: [-15, 0],
      opacity: [0, 1],
      transition: {
        duration: 0.6,
        type: "spring",
        times: [0, 1],
      },
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      animate("#quantity", {
        y: [0, -15],
        opacity: [1, 0],
        transition: {
          duration: 0.6,
          type: "spring",
          times: [0, 1],
        },
      });
      setQuantity(quantity - 1);

      animate("#quantity", {
        y: [15, 0],
        opacity: [0, 1],
        transition: {
          duration: 0.6,
          type: "spring",
          times: [0, 1],
        },
      });
    }
  };

  const toggleWishlist = (product) => {
    if (Object.keys(liked).includes(product._id)) {
      removeLiked(product._id);
    } else {
      addLiked(product._id, product);
    }
  };

  const toggleCart = (product) => {
    addCart({
      ...product,
      quantity: quantity,
      size: selectedSize,
    });
  };

  if (loading) return <DotWave />;
  if (error) return <>{console.error(error)}</>;

  if (chosenProduct != undefined && chosenProduct.images != undefined)
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">
              Home
            </a>{" "}
            /
            <a href="/catalog" className="hover:text-gray-700">
              {" "}
              Shop
            </a>{" "}
            /
            <a onClick={() => clearCart()} className="hover:text-gray-700">
              {" "}
              {chosenProduct.category}
            </a>{" "}
            /<span className="text-gray-700"> {chosenProduct.productName}</span>
          </div>
        </div>
        {/* Product Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* Product Images */}
            <div className="md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="sticky top-20">
                <div className="mb-4 overflow-hidden">
                  <img
                    id="main-product-image"
                    src={selectedImage}
                    alt="Premium Wool Blend Jacket"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {chosenProduct.images.map((image, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden rounded-lg ${
                        selectedImage === image
                          ? "border-2 border-indigo-600"
                          : "border border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        id={`thumbnail-${index}`}
                        src={image}
                        alt={`Premium Wool Blend Jacket thumbnail ${index}`}
                        className="w-full h-auto object-cover cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Product Info */}
            <div className="md:w-1/2 px-4">
              <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                LIMITED EDITION
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {chosenProduct.productName}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex flex-row gap-1 mr-2">
                  {[1, 2, 3, 4].map(() => (
                    <img src="/star-full.png" rel="star" className="w-5 h-5" />
                  ))}
                  <img src="/star-empty.png" rel="star" className="w-5 h-5" />
                </div>
                <span className="text-gray-600 text-sm">4.8 (124 reviews)</span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${chosenProduct.price}
                </span>
                <span className="text-gray-500 line-through ml-2">
                  $
                  {Number.parseFloat(
                    Number(chosenProduct.price) +
                      Number(chosenProduct.price) * 0.24
                  ).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded ml-2">
                  SAVE 24%
                </span>
              </div>
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Color: {selectedColor}
                </h3>
                <div className="flex space-x-2">
                  {products.map((product) => (
                    <button
                      key={product.color}
                      onClick={() => {
                        setChosenProduct(product);

                        selectedImage != ""
                          ? setSelectedImage(product.images[0])
                          : "";

                        setSelectedColor(product.color);
                      }}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${
                        selectedColor === product.color
                          ? "ring-2 ring-indigo-600 ring-offset-2"
                          : ""
                      }`}
                    >
                      <span
                        className={"w-8 h-8 rounded-full"}
                        style={{ backgroundColor: colors[product.color] }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    Size: {selectedSize}
                  </h3>
                  <button className="text-indigo-600 text-sm font-medium cursor-pointer">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {productSizes.map((size) => (
                    <button
                      key={size}
                      disabled={
                        !Object.keys(chosenProduct.sizes).includes(size)
                      }
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-center disabled:opacity-35 rounded-lg cursor-pointer whitespace-nowrap !rounded-button ${
                        selectedSize === size
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={quantity > 1 ? decrementQuantity : () => {}}
                    className="w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 whitespace-nowrap !rounded-button"
                  >
                    {"-"}
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-200 bg-white">
                    <motion.div id="quantity">{quantity}</motion.div>
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 whitespace-nowrap !rounded-button"
                  >
                    {"+"}
                  </button>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-2 sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
                <button
                  onClick={() => toggleCart(chosenProduct)}
                  className="btn mx-auto md:w-[23vw] w-[90%]"
                >
                  <span>{"Add to the Cart"}</span>
                </button>
                <button
                  onClick={() => toggleWishlist(chosenProduct)}
                  className="btn mx-auto md:w-[23vw] w-[90%]"
                >
                  <span>
                    {Object.keys(liked).includes(chosenProduct._id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </span>
                </button>
              </div>
              {/* Product Details */}
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Shipping</h4>
                    <p className="text-gray-600">
                      Free standard shipping on all orders over $100. Expedited
                      and international shipping options available at checkout.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Returns & Exchanges
                    </h4>
                    <p className="text-gray-600">
                      We accept returns within 30 days of delivery. Items must
                      be unworn, unwashed, and with original tags attached.
                      Return shipping is free for customers in the United
                      States.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* You May Also Like */}
        <div className="bg-gray-50 py-12">
          <div className="flex flex-col mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {allProducts.map((product, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative">
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.productName}
                          onClick={() => router.push(`/clothes/${product.sku}`)}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-300 bg-opacity-55 rounded-full">
                        <label class="ui-like">
                          <input
                            type="checkbox"
                            onChange={() => {}}
                            checked={Object.keys(liked).includes(product._id)}
                          />
                          <div
                            class="like"
                            onClick={() => toggleWishlist(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill=""
                            >
                              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                              <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                id="SVGRepo_tracerCarrier"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
                              </g>
                            </svg>
                          </div>
                        </label>
                      </button>
                      {product.tag && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full ${
                            product.tag === "new"
                              ? "bg-yellow-400 text-yellow-800"
                              : "bg-pink-400 text-white"
                          }`}
                        >
                          {product.tag.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-800 font-medium">
                        {product.productName}
                      </h3>
                      <p className="text-gray-700 mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  else return <div>{console.log(chosenProduct)}</div>;
};
export default App;
