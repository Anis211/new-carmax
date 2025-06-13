// components/EditCustomerModal.js
import React from "react";

const EditCustomerModal = ({
  showEditModal,
  editingCustomer,
  setShowEditModal,
}) => {
  if (!showEditModal || !editingCustomer) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Centered Modal */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Modal Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit Customer - {editingCustomer.name}
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Personal Information Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="customerName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="customerName"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue={editingCustomer.name}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="customerEmail"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="customerEmail"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue={editingCustomer.email}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="customerPhone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="customerPhone"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue={editingCustomer.phone}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address Section */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Shipping Address
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="addressLine1"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          id="addressLine1"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue="123 Main Street"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="addressLine2"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          id="addressLine2"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          defaultValue="Apt 4B"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            defaultValue={
                              editingCustomer.location.split(", ")[0]
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            defaultValue="NY"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-gray-700"
                          >
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            defaultValue="10001"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            defaultValue={
                              editingCustomer.location.split(", ")[1]
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Status and Type Section */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label
                      htmlFor="customerStatus"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Customer Status
                    </label>
                    <select
                      id="customerStatus"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={editingCustomer.status}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="customerType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Customer Type
                    </label>
                    <select
                      id="customerType"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={editingCustomer.type}
                    >
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6">
                  <label
                    htmlFor="customerNotes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer Notes
                  </label>
                  <textarea
                    id="customerNotes"
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Add notes about this customer..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                // Implement save logic here (e.g., update API call)
                setShowEditModal(false);
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;
