// components/CustomerDetailModal.js
import React, { useEffect, useState } from "react";

const CustomerDetailModal = ({
  showCustomerDetails,
  selectedCustomer,
  customers,
  getStatusColor,
  setShowCustomerDetails,
}) => {
  if (!showCustomerDetails || selectedCustomer === null) return null;

  const customer = customers[selectedCustomer];
  const [orders, setOrders] = useState([]);

  const total = (order) => {
    let itemsSum = 0;
    order.items.map((item) => {
      itemsSum += item.quantity * item.price;
    });
    return itemsSum + itemsSum * 0.2 + order.shipingCost;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/order?email=${customer.email}`); // Call the API route
        if (!res.ok) throw new Error("Failed to fetch orders");

        const order = await res.json();

        setOrders([...order]);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [customer]);

  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Customer Details - {customer.name}
                  </h3>
                  <button
                    onClick={() => setShowCustomerDetails(false)}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Customer Information
                      </h4>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {customer.lastName + " " + customer.firstName}
                      </p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                      <p className="text-sm text-gray-500">
                        Customer ID: {customer._id}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Shipping Address
                      </h4>
                      <p className="text-sm text-gray-900 mt-1">
                        {customer.address}
                      </p>
                      <p className="text-sm text-gray-900">
                        {customer.country + ", " + customer.city}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Purchase History
                  </h4>
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Order ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Items
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {order.orderId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.createdAt}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.items.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              ${total(order)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  order.paymentStatus,
                                  "payment"
                                )}`}
                              >
                                {order.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Customer Analytics
                    </h4>
                    <div className="bg-white border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Orders</p>
                          <p className="text-lg font-medium text-gray-900">
                            {customer.totalOrders}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Spent</p>
                          <p className="text-lg font-medium text-gray-900">
                            {customer.totalSpent}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Avg. Order Value
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            $
                            {parseFloat(
                              customer.totalSpent / customer.totalOrders
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Purchase</p>
                          <p className="text-lg font-medium text-gray-900">
                            {new Date(customer.lastPurchase).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Communication History
                    </h4>
                    <div className="bg-white border rounded-lg p-4 h-full">
                      <div className="space-y-3">
                        {customer.history.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                              <i className="fas fa-envelope text-gray-400"></i>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-900">
                                {item.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
            >
              <i className="fas fa-edit mr-2"></i> Edit Customer
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
            >
              <i className="fas fa-shopping-cart mr-2"></i> View Orders
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
            >
              <i className="fas fa-envelope mr-2"></i> Send Email
            </button>
            <button
              type="button"
              onClick={() => setShowCustomerDetails(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
