// components/SearchAndFilters.js
import React from "react";
import { motion, AnimatePresence } from "motion/react";

const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  customerStatus,
  setCustomerStatus,
  customerType,
  setCustomerType,
  registrationDate,
  setRegistrationDate,
  purchaseHistory,
  setPurchaseHistory,
  showStatusFilter,
  setShowStatusFilter,
  showTypeFilter,
  setShowTypeFilter,
  showDateFilter,
  setShowDateFilter,
  showPurchaseFilter,
  setShowPurchaseFilter,
  clearFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-row flex-wrap gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search customers by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-none">
          {/* Customer Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowStatusFilter(!showStatusFilter)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Customer Status
            </button>
            <AnimatePresence>
              {showStatusFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCustomerStatus("all");
                        setShowStatusFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setCustomerStatus("Active");
                        setShowStatusFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Active
                    </button>
                    <button
                      onClick={() => {
                        setCustomerStatus("Inactive");
                        setShowStatusFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Inactive
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Customer Type Filter */}
          <div className="relative">
            <button
              onClick={() => setShowTypeFilter(!showTypeFilter)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <i className="fas fa-tag mr-2 text-gray-500"></i>
              Customer Type
            </button>
            <AnimatePresence>
              {showTypeFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCustomerType("all");
                        setShowTypeFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setCustomerType("Retail");
                        setShowTypeFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Retail
                    </button>
                    <button
                      onClick={() => {
                        setCustomerType("Wholesale");
                        setShowTypeFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Wholesale
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Registration Date Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <i className="fas fa-calendar-alt mr-2 text-gray-500"></i>
              Registration Date
            </button>
            <AnimatePresence>
              {showDateFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={registrationDate.start}
                        onChange={(e) =>
                          setRegistrationDate({
                            ...registrationDate,
                            start: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={registrationDate.end}
                        onChange={(e) =>
                          setRegistrationDate({
                            ...registrationDate,
                            end: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setShowDateFilter(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Purchase History Filter */}
          <div className="relative">
            <button
              onClick={() => setShowPurchaseFilter(!showPurchaseFilter)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <i className="fas fa-shopping-bag mr-2 text-gray-500"></i>
              Purchase History
            </button>
            <AnimatePresence>
              {showPurchaseFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 60 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setPurchaseHistory("all");
                        setShowPurchaseFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setPurchaseHistory("frequent");
                        setShowPurchaseFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Frequent (5+ orders)
                    </button>
                    <button
                      onClick={() => {
                        setPurchaseHistory("occasional");
                        setShowPurchaseFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Occasional (2-4 orders)
                    </button>
                    <button
                      onClick={() => {
                        setPurchaseHistory("one-time");
                        setShowPurchaseFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      One-time
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <i className="fas fa-times mr-2 text-gray-500"></i>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
