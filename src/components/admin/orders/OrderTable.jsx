import { AnimatePresence, motion } from "motion/react";
import React from "react";
import Pagination from "../Pagination";

const OrdersTable = ({
  filteredOrders,
  handleViewDetails,
  getStatusColor,
  setCount,
  setChange,
  total,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
      <div className="overflow-x-scroll md:overflow-hidden">
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
                Customer
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
                Total
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
                Payment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fulfillment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewDetails(index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerData.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items.length} {order.items === 1 ? "item" : "items"}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.shippingStatus,
                        "fulfillment"
                      )}`}
                    >
                      {order.shippingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(index);
                        }}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <i className="fas fa-print"></i>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
            Next
          </button>
        </div>
        {total != 0 && (
          <Pagination setCount={setCount} tot={total} setChange={setChange} />
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
