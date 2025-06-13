// components/CustomersTable.js
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import Pagination from "../Pagination";

const CustomersTable = ({
  filteredCustomers,
  setSelectedCustomer,
  setShowCustomerDetails,
  getStatusColor,
  setCount,
  setChange,
  total,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
      <div className="overflow-x-scroll md:overflow-x-auto overflow-y-hidden my-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Orders
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Spent
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Purchase
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
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  key={customer.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedCustomer(index);
                    setShowCustomerDetails(true);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-user text-gray-500"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.firstName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.country + ", " + customer.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {customer.totalSpent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.lastPurchase).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit customer
                        }}
                        className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3">
        {total != 0 && (
          <Pagination setCount={setCount} tot={total} setChange={setChange} />
        )}
      </div>
    </div>
  );
};

export default CustomersTable;
