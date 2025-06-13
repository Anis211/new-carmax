import { AnimatePresence, motion, animate } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import useUser from "@/zustand/user";

export default function Navbar() {
  const user = useUser((state) => state.user);
  const liked = useUser((state) => state.liked);
  const removeLiked = useUser((state) => state.removeLiked);

  const cart = useUser((state) => state.cart);
  const removeCart = useUser((state) => state.removeCart);
  const changeCart = useUser((state) => state.changeCart);

  const lang = useUser((state) => state.language);
  const changeLang = useUser((state) => state.changeLanguage);

  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const [hovered, setHovered] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const calculateTotal = () => {
    let sum = 0;
    Object.values(cart).map((item) => (sum += item.quantity * item.price));
    return sum;
  };

  const incrementQuantity = (product) => {
    animate("#quantity", {
      y: [0, 10],
      opacity: [1, 0],
      transition: {
        duration: 0.6,
        type: "spring",
        times: [0, 1],
      },
    });
    changeCart(product._id + product.size, Number(product.quantity) + 1);
    animate("#quantity", {
      y: [-10, 0],
      opacity: [0, 1],
      transition: {
        duration: 0.6,
        type: "spring",
        times: [0, 1],
      },
    });
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      animate("#quantity", {
        y: [0, -10],
        opacity: [1, 0],
        transition: {
          duration: 0.6,
          type: "spring",
          times: [0, 1],
        },
      });
      changeCart(product._id + product.size, Number(product.quantity) - 1);
      animate("#quantity", {
        y: [10, 0],
        opacity: [0, 1],
        transition: {
          duration: 0.6,
          type: "spring",
          times: [0, 1],
        },
      });
    }
  };

  return (
    <div className="px-8 py-6 min-h-[8vh] border-b border-gray-800 flex flex-row md:bg-black">
      <nav className="visible md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white z-50">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold text-yellow-400">CARMAX</div>
          <div className="flex items-center space-x-3">
            <button
              className="p-1 cursor-pointer mt-2"
              onClick={() => {
                showCart && setShowCart(false);
                setShowWishlist(!showWishlist);
              }}
            >
              <img
                src="/like.png"
                rel="image"
                className={`w-7 h-7 ${
                  Object.keys(liked).length > 0 ? "mt-0" : "mt-1 mb-3"
                }`}
              />
              {Object.keys(liked).length > 0 && (
                <span
                  className={`relative bottom-10 left-6 z-60 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center`}
                >
                  {Object.keys(liked).length}
                </span>
              )}
            </button>
            <button
              className="p-1 cursor-pointer"
              onClick={() => {
                showWishlist && setShowWishlist(false);
                setShowCart(!showCart);
              }}
            >
              <img
                src="/cart.png"
                rel="image"
                className={`w-7 h-7 ${
                  Object.keys(cart).length > 0 ? "mt-3" : "mt-1 mb-2"
                }`}
              />
              {Object.keys(cart).length > 0 && (
                <span
                  className={`relative bottom-10 left-6 z-60 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center`}
                >
                  {Object.keys(cart).length}
                </span>
              )}
            </button>
            <button
              className="p-1 cursor-pointer"
              onClick={() => {
                if (user.id != "incognito") {
                  router.push("/account");
                } else {
                  router.push("/sign-in");
                }
              }}
            >
              <img src="/account.png" rel="image" className="w-7 h-7" />
            </button>
            <label class="switch">
              <input checked="" type="checkbox" class="toggle" />
              <span class="slider"></span>
              <span class="card-side"></span>
            </label>
            <label class="hamburger">
              <input type="checkbox" onChange={toggleMenu} />
              <svg viewBox="0 0 32 32">
                <path
                  class="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path class="line" d="M7 16 27 16" />
              </svg>
            </label>
          </div>
        </div>
        <AnimatePresence>
          {showWishlist && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="absolute mt-2 w-[95%] left-[2.5%] bg-white rounded-lg shadow-xl z-40"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Избранное
                  </h3>
                  <button onClick={() => setShowWishlist(false)} class="button">
                    <span class="X"></span>
                    <span class="Y"></span>
                  </button>
                </div>
                {Object.values(liked).length > 0 ? (
                  <>
                    <div className="space-y-3 max-h-60">
                      <AnimatePresence>
                        {Object.values(liked).map((product) => (
                          <div className="flex flex-row gap-1 justify-between">
                            <motion.div
                              initial={{ opacity: 0, y: 60 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -60 }}
                              transition={{ duration: 0.6, type: "spring" }}
                              key={product.id}
                              onClick={() => {
                                router.push(`/clothes/${product.sku}`);
                                setShowWishlist(false);
                              }}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.sku}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                  {product.brand}
                                </p>
                                <p className="text-sm text-gray-600">
                                  ${product.price}
                                </p>
                              </div>
                            </motion.div>
                            <button
                              onClick={() => removeLiked(product._id)}
                              aria-label="Delete item"
                              class="delete-button"
                            >
                              <svg
                                class="trash-svg"
                                viewBox="0 -10 64 74"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="trash-can">
                                  <rect
                                    x="16"
                                    y="24"
                                    width="32"
                                    height="30"
                                    rx="3"
                                    ry="3"
                                    fill="#e74c3c"
                                  ></rect>

                                  <g transform-origin="12 18" id="lid-group">
                                    <rect
                                      x="12"
                                      y="12"
                                      width="40"
                                      height="6"
                                      rx="2"
                                      ry="2"
                                      fill="#c0392b"
                                    ></rect>
                                    <rect
                                      x="26"
                                      y="8"
                                      width="12"
                                      height="4"
                                      rx="2"
                                      ry="2"
                                      fill="#c0392b"
                                    ></rect>
                                  </g>
                                </g>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="mt-4 pt-3 border-t">
                      <button
                        onClick={() => {
                          setShowWishlist(false);
                          user.id != "incognito"
                            ? router.push("/account")
                            : router.push("/sign-in");
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium !rounded-button whitespace-nowrap"
                      >
                        Перейти ко всем избранным
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Список избранного пуст</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Корзина
                  </h3>
                  <button onClick={() => setShowCart(false)} class="button">
                    <span class="X"></span>
                    <span class="Y"></span>
                  </button>
                </div>
                {Object.values(cart).length > 0 ? (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-scroll">
                      {Object.values(cart).map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.sku}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {product.brand}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${product.price} || size: {product.size}
                            </p>
                            <div className="flex items-center">
                              <button
                                onClick={() => decrementQuantity(product)}
                                className="w-10 h-10 bg-gray-100 text-black rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 whitespace-nowrap !rounded-button"
                              >
                                {"-"}
                              </button>
                              <div className="w-14 h-10 flex items-center text-black justify-center border-t border-b border-gray-200 bg-white">
                                <motion.div id="quantity">
                                  {product.quantity}
                                </motion.div>
                              </div>
                              <button
                                onClick={() => incrementQuantity(product)}
                                className="w-10 h-10 bg-gray-100 text-black rounded-r-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 whitespace-nowrap !rounded-button"
                              >
                                {"+"}
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">
                              ${(product.price * product.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeCart(product)}
                              aria-label="Delete item"
                              class="delete-button"
                            >
                              <svg
                                class="trash-svg"
                                viewBox="0 -10 64 74"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="trash-can">
                                  <rect
                                    x="16"
                                    y="24"
                                    width="32"
                                    height="30"
                                    rx="3"
                                    ry="3"
                                    fill="#e74c3c"
                                  ></rect>

                                  <g transform-origin="12 18" id="lid-group">
                                    <rect
                                      x="12"
                                      y="12"
                                      width="40"
                                      height="6"
                                      rx="2"
                                      ry="2"
                                      fill="#c0392b"
                                    ></rect>
                                    <rect
                                      x="26"
                                      y="8"
                                      width="12"
                                      height="4"
                                      rx="2"
                                      ry="2"
                                      fill="#c0392b"
                                    ></rect>
                                  </g>
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Итого:</span>
                        <span className="font-medium">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <a data-readdy="true" className="block">
                          <button
                            onClick={() => {
                              router.push("/order");
                              setShowCart(false);
                            }}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium !rounded-button whitespace-nowrap"
                          >
                            Оформить заказ
                          </button>
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Корзина пуста</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`${
            isMenuOpen ? "max-h-60" : "max-h-0"
          } visible md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="px-4 py-2">
            <a href="/" className="block py-3 border-b border-gray-700">
              Home
            </a>
            <a href="/#about" className="block py-3 border-b border-gray-700">
              About Us
            </a>
            <a href="/catalog" className="block py-3 border-b border-gray-700">
              Catalog
            </a>
            <a href="/#contact" className="block py-3">
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div className="invisible md:visible w-[25%] flex flex-col">
        <h1 className="font-inter font-bold text-3xl text-yellow-400">
          CARMAX
        </h1>
      </div>
      <div className="invisible md:visible w-[50%] mt-2 flex flex-row justify-evenly items-center">
        {[
          { name: "Главная", link: "/" },
          { name: "О нас", link: "/#about" },
          { name: "Каталог", link: "/catalog" },
          { name: "Контакты", link: "/#contact" },
        ].map((item, index) => (
          <motion.h2
            key={index}
            initial={{ opacity: 0.8 }}
            whileHover={{
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.7, type: "spring" },
            }}
            onMouseEnter={() =>
              setHovered((prev) => ({ ...prev, [index]: true }))
            }
            onMouseLeave={() =>
              setHovered((prev) => ({ ...prev, [index]: false }))
            }
            className="font-inter font-semibold text-white text-xl flex flex-col gap-1"
            onClick={() => router.push(item.link)}
          >
            {item.name}
            <motion.div
              layout
              transition={{ duration: 0.6, type: "spring" }}
              className={`border-b-2 border-b-yellow-400 ${
                hovered[index] ? "w-[100%]" : "w-0"
              }`}
            />
          </motion.h2>
        ))}
      </div>
      <div className="invisible md:visible w-[25%] flex flex-row gap-5 justify-end items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="text-white hover:text-blue-400 cursor-pointer"
              onClick={() => {
                showCart && setShowCart(false);
                setShowWishlist(!showWishlist);
              }}
            >
              <motion.img
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6, type: "spring" },
                }}
                src={"/like.png"}
                className="w-8 h-8"
                rel="icon"
              />
              {Object.keys(liked).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {Object.keys(liked).length}
                </span>
              )}
            </button>
            <AnimatePresence>
              {showWishlist && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute -right-12 mt-2 w-80 bg-white rounded-lg shadow-xl z-40"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Избранное
                      </h3>
                      <button
                        onClick={() => setShowWishlist(false)}
                        class="button"
                      >
                        <span class="X"></span>
                        <span class="Y"></span>
                      </button>
                    </div>
                    {Object.values(liked).length > 0 ? (
                      <>
                        <div className="space-y-3 max-h-60">
                          <AnimatePresence>
                            {Object.values(liked).map((product) => (
                              <div className="flex flex-row gap-1 justify-between">
                                <motion.div
                                  initial={{ opacity: 0, y: 60 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, x: -60 }}
                                  transition={{ duration: 0.6, type: "spring" }}
                                  key={product.id}
                                  onClick={() => {
                                    router.push(`/clothes/${product.sku}`);
                                    setShowWishlist(false);
                                  }}
                                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                                >
                                  <img
                                    src={product.images[0]}
                                    alt={product.sku}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                      {product.brand}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      ${product.price}
                                    </p>
                                  </div>
                                </motion.div>
                                <button
                                  onClick={() => removeLiked(product._id)}
                                  aria-label="Delete item"
                                  class="delete-button"
                                >
                                  <svg
                                    class="trash-svg"
                                    viewBox="0 -10 64 74"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="trash-can">
                                      <rect
                                        x="16"
                                        y="24"
                                        width="32"
                                        height="30"
                                        rx="3"
                                        ry="3"
                                        fill="#e74c3c"
                                      ></rect>

                                      <g
                                        transform-origin="12 18"
                                        id="lid-group"
                                      >
                                        <rect
                                          x="12"
                                          y="12"
                                          width="40"
                                          height="6"
                                          rx="2"
                                          ry="2"
                                          fill="#c0392b"
                                        ></rect>
                                        <rect
                                          x="26"
                                          y="8"
                                          width="12"
                                          height="4"
                                          rx="2"
                                          ry="2"
                                          fill="#c0392b"
                                        ></rect>
                                      </g>
                                    </g>
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </AnimatePresence>
                        </div>
                        <div className="mt-4 pt-3 border-t">
                          <button
                            onClick={() => {
                              setShowWishlist(false);
                              user.id != "incognito"
                                ? router.push("/account")
                                : router.push("/sign-in");
                            }}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium !rounded-button whitespace-nowrap"
                          >
                            Перейти ко всем избранным
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">Список избранного пуст</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <button
              className="text-white hover:text-blue-400 cursor-pointer"
              onClick={() => {
                showWishlist && setShowWishlist(false);
                setShowCart(!showCart);
              }}
            >
              <motion.img
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6, type: "spring" },
                }}
                src={"/cart.png"}
                className="w-8 h-8"
                rel="icon"
              />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {Object.keys(cart).length}
                </span>
              )}
            </button>
            <AnimatePresence>
              {showCart && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Корзина
                      </h3>
                      <button onClick={() => setShowCart(false)} class="button">
                        <span class="X"></span>
                        <span class="Y"></span>
                      </button>
                    </div>
                    {Object.values(cart).length > 0 ? (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {Object.values(cart).map((product) => (
                            <div
                              key={product._id}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.sku}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                  {product.brand}
                                </p>
                                <p className="text-sm text-gray-600">
                                  ${product.price} || size: {product.size}
                                </p>
                                <div className="flex items-center">
                                  <button
                                    onClick={() => decrementQuantity(product)}
                                    className="w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 whitespace-nowrap !rounded-button"
                                  >
                                    {"-"}
                                  </button>
                                  <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-200 bg-white">
                                    <motion.div id="quantity">
                                      {product.quantity}
                                    </motion.div>
                                  </div>
                                  <button
                                    onClick={() => incrementQuantity(product)}
                                    className="w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 whitespace-nowrap !rounded-button"
                                  >
                                    {"+"}
                                  </button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">
                                  $
                                  {(product.price * product.quantity).toFixed(
                                    2
                                  )}
                                </p>
                                <button
                                  onClick={() => removeCart(product)}
                                  aria-label="Delete item"
                                  class="delete-button"
                                >
                                  <svg
                                    class="trash-svg"
                                    viewBox="0 -10 64 74"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="trash-can">
                                      <rect
                                        x="16"
                                        y="24"
                                        width="32"
                                        height="30"
                                        rx="3"
                                        ry="3"
                                        fill="#e74c3c"
                                      ></rect>

                                      <g
                                        transform-origin="12 18"
                                        id="lid-group"
                                      >
                                        <rect
                                          x="12"
                                          y="12"
                                          width="40"
                                          height="6"
                                          rx="2"
                                          ry="2"
                                          fill="#c0392b"
                                        ></rect>
                                        <rect
                                          x="26"
                                          y="8"
                                          width="12"
                                          height="4"
                                          rx="2"
                                          ry="2"
                                          fill="#c0392b"
                                        ></rect>
                                      </g>
                                    </g>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t">
                          <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Итого:</span>
                            <span className="font-medium">
                              ${calculateTotal().toFixed(2)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <a data-readdy="true" className="block">
                              <button
                                onClick={() => {
                                  router.push("/order");
                                  setShowCart(false);
                                }}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium !rounded-button whitespace-nowrap"
                              >
                                Оформить заказ
                              </button>
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <i className="fas fa-shopping-cart text-gray-300 text-3xl mb-2"></i>
                        <p className="text-gray-500">Корзина пуста</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {["/account.png"].map((item, index) => (
          <motion.img
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.6, type: "spring" },
            }}
            key={index}
            src={item}
            className="w-8 h-8"
            rel="icon"
            onClick={() => {
              if (item.includes("account")) {
                if (user.id != "incognito") {
                  router.push("/account");
                } else {
                  router.push("/sign-in");
                }
              }
            }}
          />
        ))}
        <div className="flex flex-col gap-1">
          <label class="switch">
            <input
              type="checkbox"
              checked={lang}
              onChange={() => changeLang()}
            />
            <span class="slider"></span>
          </label>
          <p className="font-inter font-medium text-md text-white absolute top-[7%] ml-[1vw]">
            {!lang ? "rus" : "eng"}
          </p>
        </div>
      </div>
    </div>
  );
}
