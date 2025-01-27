import React, { useEffect, useState } from "react";
import { api } from "../services/apiSevice"; // Your API service file
import { endpoints } from "../services/endpoint";
import { useNavigate } from "react-router";

const OrderHistory = () => {
   const [orders, setOrders] = useState([]); // To store order history
   const [loading, setLoading] = useState(true); // Loading state
   const [error, setError] = useState(null); // Error state (optional)
   const navigate = useNavigate();

   // Fetch order history from API
   useEffect(() => {
      const fetchOrders = async () => {
         try {
            setLoading(true); // Set loading to true before making API call
            const response = await api.get(endpoints.ORDER_HISTORY, {}, navigate);
            setOrders(response.data.orders);
         } catch (err) {
            console.error("Error fetching order history:", err);
            setError("Failed to fetch order history. Please try again later.");
         } finally {
            setLoading(false); // Set loading to false after API call
         }
      };

      fetchOrders();
   }, [navigate]);

   return (
      <div className="p-6 bg-gray-100 min-h-screen">
         <h1 className="text-2xl font-bold mb-6">Order History</h1>

         {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
         ) : error ? (
            <div className="text-center text-red-500">{error}</div>
         ) : orders.length === 0 ? (
            <div className="text-center text-gray-600">No orders found.</div>
         ) : (
            <div className="space-y-4">
               {orders.map((order) => (
                  <div
                     key={order._id}
                     className="p-4 bg-white shadow rounded-lg border hover:shadow-lg transition"
                  >
                     <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                        <span
                           className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === "Completed"
                                 ? "bg-green-200 text-green-600"
                                 : "bg-yellow-200 text-yellow-600"
                              }`}
                        >
                           {order.status}
                        </span>
                     </div>
                     <div className="text-sm text-gray-600 mb-2">
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> ${order?.totalAmount}</p>
                     </div>
                     <div>
                        <h3 className="text-sm font-semibold mb-1">Items:</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                           {order.items.map((item, index) => (
                              <li key={index}>
                                 {item?.menuItemId?.name} - {item?.quantity}x
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default OrderHistory;
