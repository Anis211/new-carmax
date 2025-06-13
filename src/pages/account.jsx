import React, { useState, useEffect } from "react";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountContent from "@/components/account/AccountContent";
import useUser from "@/zustand/user";
import DotWave from "@/components/custom/DotWave";
import Sidebar from "@/components/admin/Sidebar";
import AddProductForm from "@/components/admin/AddProduct";
import ProductTable from "@/components/admin/ProductTable";
import Pagination from "@/components/admin/Pagination";
import SearchAndFilters from "@/components/admin/orders/SearchAndFilters";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderDetailModal from "@/components/admin/orders/OrderDetail";
import SearchAndFilters1 from "@/components/account/SearchAndFilters";
import OrdersTable1 from "@/components/account/OrderTable";
import OrderDetailModal1 from "@/components/account/OrderDetail";
import Customers from "@/components/admin/customers/Customers";
import ToastNotification from "@/components/custom/ToesterNotification";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";

export default function Users() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState([0, 10]);
  const [change, setChange] = useState(false);

  const [total1, setTotal1] = useState(0);
  const [count1, setCount1] = useState([0, 10]);
  const [change1, setChange1] = useState(false);

  const [total2, setTotal2] = useState(0);
  const [count2, setCount2] = useState([0, 10]);
  const [change2, setChange2] = useState(false);

  const [total3, setTotal3] = useState(0);
  const [activeTab, setActiveTab] = useState("personal");
  const user = useUser((state) => state.user);
  const liked = useUser((state) => state.liked);
  const removeLiked = useUser((state) => state.removeLiked);
  const addLiked = useUser((state) => state.addLiked);

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab1, setActiveTab1] = useState("products");

  const [searchQuery1, setSearchQuery1] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [fulfillmentStatus, setFulfillmentStatus] = useState("all");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPaymentFilter, setShowPaymentFilter] = useState(false);
  const [showFulfillmentFilter, setShowFulfillmentFilter] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [customers, setCustomers] = useState([]);

  const toggleWishlist = (product) => {
    if (Object.keys(liked).includes(product._id)) {
      removeLiked(product._id);
      setProducts(products.filter((item) => item._id != product._id));
    } else {
      addLiked(product._id, product);
    }
  };

  const getStatusColor = (status, type) => {
    if (type === "payment") {
      switch (status) {
        case "Paid":
          return "bg-green-100 text-green-800";
        case "Pending":
          return "bg-yellow-100 text-yellow-800";
        case "Failed":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    } else {
      switch (status) {
        case "Delivered":
          return "bg-green-100 text-green-800";
        case "Shipped":
          return "bg-blue-100 text-blue-800";
        case "Processing":
          return "bg-yellow-100 text-yellow-800";
        case "Cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  // Filter orders based on search query, date range, payment status, and fulfillment status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery1.toLowerCase()) ||
      order.customerId.toLowerCase().includes(searchQuery1.toLowerCase());
    const matchesPayment =
      paymentStatus === "all" || order.payment === paymentStatus;
    const matchesFulfillment =
      fulfillmentStatus === "all" || order.fulfillment === fulfillmentStatus;
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const orderDate = new Date(order.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDate = orderDate >= startDate && orderDate <= endDate;
    }
    return matchesSearch && matchesPayment && matchesFulfillment && matchesDate;
  });

  // Function to handle viewing order details
  const handleViewDetails = (id) => {
    setSelectedOrder(id);
    setShowOrderDetails(true);
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery1("");
    setDateRange({ start: "", end: "" });
    setPaymentStatus("all");
    setFulfillmentStatus("all");
  };

  // Props for SearchAndFilters component
  const filtersProps = {
    searchQuery1,
    setSearchQuery1,
    dateRange,
    setDateRange,
    paymentStatus,
    setPaymentStatus,
    fulfillmentStatus,
    setFulfillmentStatus,
    showDatePicker,
    setShowDatePicker,
    showPaymentFilter,
    setShowPaymentFilter,
    showFulfillmentFilter,
    setShowFulfillmentFilter,
    clearFilters,
  };

  // Props for OrderDetailModal component
  const modalProps = {
    showOrderDetails,
    selectedOrder,
    orders,
    setShowOrderDetails,
    getStatusColor,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/customers?countl=${count1[0]}&countr=${count1[1]}`
        ); // Call the API route
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();

        const res = await fetch(`/api/total?id=${"680f76ede345aea0f2104a24"}`);
        const data1 = await res.json();

        setTotal1(data1.totalCount);
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    activeTab1 == "customers" && fetchData();
  }, [activeTab1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/customers?countl=${count1[0]}&countr=${count1[1]}`
        ); // Call the API route
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();

        const res = await fetch(`/api/total?id=${"680f76ede345aea0f2104a24"}`);
        const data1 = await res.json();

        setTotal1(data1.totalCount);
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setChange1(false);
      }
    };

    change1 && fetchData();
  }, [change1]);

  useEffect(() => {
    const fetchData = async () => {
      const email = user.id;

      try {
        const response = await fetch(`/api/user?email=${email}`); // Call the API route
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);

        if (user.id === "admin") {
          const response1 = await fetch(
            `/api/add-product?countl=${count[0]}&countr=${count[1]}`
          ); // Call the API route

          if (!response1.ok) throw new Error("Failed to fetch products");
          const data1 = await response1.json();

          const res = await fetch(
            `/api/total?id=${"680d9646e345aea0f2104a0f"}`
          );
          const data = await res.json();

          setTotal(data.totalCount);
          setProducts(data1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setChange(false);
      }
    };

    fetchData();
  }, [user, activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          (user.id != "admin" && user.id != "incognito") ||
          activeTab === "wishlist"
        ) {
          const response1 = await fetch(`/api/wishlist`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liked: liked,
            }),
          });

          if (!response1.ok) throw new Error("Failed to fetch products");
          const data1 = await response1.json();

          setProducts(data1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (change) {
          const response1 = await fetch(
            `/api/add-product?countl=${count[0]}&countr=${count[1]}`
          ); // Call the API route
          if (!response1.ok) throw new Error("Failed to fetch products");

          const data1 = await response1.json();
          setProducts(data1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setChange(false);
      }
    };

    change && fetchData();
  }, [change]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/order?email=${user.id}&countl=${count2[0]}&countr=${count2[1]}`
        ); // Call the API route
        if (!res.ok) throw new Error("Failed to fetch orders");
        const order = await res.json();

        const result = await fetch(
          `/api/total?id=${"680f7cf5e345aea0f2104a25"}`
        );
        const data = await result.json();

        activeTab == "orders" && setTotal3(order.length);
        activeTab1 == "orders" && setTotal2(data.totalCount);
        setOrders(order);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    activeTab1 == "orders" || activeTab == "orders" ? fetchData() : "";
  }, [activeTab1, activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/order?email=${user.id}&countl=${count2[0]}&countr=${count2[1]}`
        ); // Call the API route
        if (!res.ok) throw new Error("Failed to fetch orders");
        const order = await res.json();

        const result = await fetch(
          `/api/total?id=${"680f7cf5e345aea0f2104a25"}`
        );
        const data = await result.json();

        setTotal2(data.totalCount);
        setOrders(order);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setChange2(false);
      }
    };

    change2 ? fetchData() : "";
  }, [change2]);

  if (loading) return <DotWave />;

  if (user.id != "admin") {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex px-4 py-4 ml-3">
          <div className="text-sm text-gray-500">
            <a href="/" className="hover:text-gray-900 cursor-pointer">
              Home
            </a>
            {" > "}
            <span className="text-gray-800">My Account</span>
          </div>
        </div>
        {/* Account Dashboard */}
        <div className="flex flex-col gap-2 mx-auto px-4 py-5">
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-8 ml-3">
            My Account
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={users}
            />
            {users != undefined && activeTab == "personal" ? (
              <AccountContent
                user={users}
                activeTab={activeTab}
                setError={setError}
                setSuccess={setSuccess}
              />
            ) : (
              ""
            )}
            {activeTab === "orders" && (
              <div className="flex flex-col bg-gray-50 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Management
                </h1>

                <SearchAndFilters1 {...filtersProps} />

                {/* Orders Table */}
                <OrdersTable1
                  filteredOrders={filteredOrders}
                  handleViewDetails={handleViewDetails}
                  getStatusColor={getStatusColor}
                  setCount={setCount2}
                  total={total3}
                  setChange={setChange2}
                />

                {/* Order Details Modal */}
                <OrderDetailModal1 {...modalProps} />
              </div>
            )}
            {activeTab === "wishlist" && (
              <div className="flex flex-row flex-wrap gap-2">
                {" "}
                <AnimatePresence>
                  {liked.length > 0 ? (
                    products.map((product, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        layout
                        key={index}
                        className="bg-white w-[95%] mx-auto md:mx-0 md:w-auto rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="relative">
                          <div className="relative h-80 overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.productName}
                              onClick={() =>
                                user.id != "incognito"
                                  ? router.push(`/clothes/${product.sku}`)
                                  : router.push("sign-in")
                              }
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center cursor-pointer bg-gray-300 bg-opacity-55 rounded-full">
                            <label class="ui-like">
                              <input
                                type="checkbox"
                                checked={Object.keys(liked).includes(
                                  product._id
                                )}
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
                    ))
                  ) : (
                    <motion.div
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 60, opacity: 0 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="text-center py-6 self-center justify-self-center"
                    >
                      <p className="text-gray-500 font-inter text-xl">
                        Список избранного пуст...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        <AnimatePresence>
          {error != null && error != "" && (
            <ToastNotification text={"Ошибка: " + error} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {success && (
            <ToastNotification text={"Your data is Updated Successfully!"} />
          )}
        </AnimatePresence>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 flex md:flex-row flex-col">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab1} setActiveTab={setActiveTab1} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="md:py-6 md:px-8 text-center md:text-start">
            {activeTab1 === "orders" && (
              <div className="min-h-screen bg-gray-50 md:p-8 p-3">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Management
                </h1>

                <SearchAndFilters {...filtersProps} />

                {/* Orders Table */}
                <OrderTable
                  filteredOrders={filteredOrders}
                  handleViewDetails={handleViewDetails}
                  getStatusColor={getStatusColor}
                  setCount={setCount2}
                  setChange={setChange2}
                  total={total2}
                />

                {/* Order Details Modal */}
                <OrderDetailModal
                  {...modalProps}
                  setChange={setChange2}
                  setError={setError}
                />
              </div>
            )}
            {activeTab1 === "products" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Product Management
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your products here.
                </p>
              </div>
            )}
            {activeTab1 === "products" && (
              <div className="min-h-screen overflow-x-scroll bg-gray-50 flex flex-col">
                <main className="flex-1 overflow-auto md:p-8 p-3">
                  {/* Product Table */}
                  <ProductTable
                    products={products}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setActiveTab1={setActiveTab1}
                  />

                  {/* Pagination */}
                  {total != 0 && (
                    <Pagination
                      setCount={setCount}
                      tot={total}
                      setChange={setChange}
                    />
                  )}
                </main>
              </div>
            )}
            {activeTab1 === "customers" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Customer Management
                </h1>
                <p className="text-sm text-gray-500">
                  View and manage customer information
                </p>
              </div>
            )}
            {activeTab1 === "customers" && (
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <main className="flex-1 overflow-auto md:p-8">
                  <Customers
                    customers={customers}
                    getStatusColor={getStatusColor}
                    setCount={setCount1}
                    total={total1}
                    setChange={setChange1}
                  />
                </main>
              </div>
            )}
            {activeTab1 === "add-product" && (
              <AddProductForm
                setActiveTab1={setActiveTab1}
                setError={setError}
                setLoading={setLoading}
                setChange={setChange}
                setSuccess={setSuccess}
              />
            )}
            <AnimatePresence>
              {error != null && <ToastNotification text={"Ошибка: " + error} />}
            </AnimatePresence>
            <AnimatePresence>
              {success && (
                <ToastNotification text={"Product Added Successfully!"} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }
}
