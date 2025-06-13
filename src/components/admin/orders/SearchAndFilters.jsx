import React from "react";

const SearchAndFilters = ({
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
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between">
        {/* Search Bar */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search orders by ID or customer name"
              value={searchQuery1}
              onChange={(e) => setSearchQuery1(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-none">
          {/* Date Picker */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <i className="fas fa-calendar-alt mr-2 text-gray-500"></i>
              Date Range
            </button>
            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
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
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Payment Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowPaymentFilter(!showPaymentFilter)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <i className="fas fa-credit-card mr-2 text-gray-500"></i>
              Payment Status
            </button>
            {showPaymentFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setPaymentStatus("all");
                      setShowPaymentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setPaymentStatus("Paid");
                      setShowPaymentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => {
                      setPaymentStatus("Pending");
                      setShowPaymentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      setPaymentStatus("Failed");
                      setShowPaymentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Failed
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Fulfillment Status Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFulfillmentFilter(!showFulfillmentFilter)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <i className="fas fa-truck mr-2 text-gray-500"></i>
              Fulfillment Status
            </button>
            {showFulfillmentFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setFulfillmentStatus("all");
                      setShowFulfillmentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setFulfillmentStatus("Processing");
                      setShowFulfillmentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => {
                      setFulfillmentStatus("Shipped");
                      setShowFulfillmentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => {
                      setFulfillmentStatus("Delivered");
                      setShowFulfillmentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => {
                      setFulfillmentStatus("Cancelled");
                      setShowFulfillmentFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
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
