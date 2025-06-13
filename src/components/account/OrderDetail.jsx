import React from "react";

const OrderDetailModal1 = ({
  showOrderDetails,
  selectedOrder,
  orders,
  setShowOrderDetails,
  getStatusColor,
}) => {
  if (!showOrderDetails || selectedOrder === null) return null;

  const order = orders[selectedOrder];

  const subtotal = () => {
    let sum = 0;
    order.items.map((item) => (sum += item.price * item.quantity));
    return sum;
  };

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
                    Order Details - {order.orderId}
                  </h3>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Customer Information
                      </h4>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {order.customerData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.customerData.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.customerData.phone}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Shipping Address
                      </h4>
                      <p className="text-sm text-gray-900 mt-1">
                        {order.address.street + " " + order.address.building}
                      </p>
                      {order.address.apartment.length > 0 && (
                        <p className="text-sm text-gray-900">
                          {order.address.apartment}
                        </p>
                      )}
                      <p className="text-sm text-gray-900">
                        {order.address.city}
                      </p>
                      <p className="text-sm text-gray-900">Кыргызстан</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Order Summary
                  </h4>
                  <div className="bg-white border rounded-lg overflow-scroll">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="md:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="md:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="md:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="md:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.productName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${item.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          ></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Subtotal
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${subtotal()}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          ></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Shipping
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.shipingCost}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          ></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Tax
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${Number(subtotal() * 0.2).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          ></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                            Total
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                            $
                            {Number(
                              subtotal() + subtotal() * 0.2 + order.shipingCost
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Payment Information
                    </h4>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-sm text-gray-900 font-medium">
                        Payment Method: Credit Card
                      </p>
                      <p className="text-sm text-gray-500">
                        Card ending in: {order.paymentData.number}
                      </p>
                      <p className="text-sm text-gray-500">
                        Transaction ID: {order.paymentData.transactionId}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.paymentStatus,
                            "payment"
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Fulfillment Information
                    </h4>
                    <div className="bg-white border rounded-lg p-4">
                      <p className="text-sm text-gray-900 font-medium">
                        Shipping Method: {order.shippingMethod}
                      </p>
                      {order.shippingMethod != "pickup" ? (
                        <>
                          <p className="text-sm text-gray-500">
                            Tracking Number: {order.shippingData.trackNum}
                          </p>
                          <p className="text-sm text-gray-500">
                            Estimated Delivery:{" "}
                            {order.shippingData.estimatedDate}
                          </p>
                        </>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-900 mt-1">
                            {order.address.street +
                              " " +
                              order.address.building}
                          </p>
                          {order.address.apartment.length > 0 && (
                            <p className="text-sm text-gray-900">
                              {order.address.apartment}
                            </p>
                          )}
                          <p className="text-sm text-gray-900">
                            {order.address.city}
                          </p>
                          <p className="text-sm text-gray-900">Кыргызстан</p>
                        </div>
                      )}
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.shippingStatus,
                            "fulfillment"
                          )}`}
                        >
                          {order.shippingStatus}
                        </span>
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
              onClick={() => setShowOrderDetails(false)}
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

export default OrderDetailModal1;
