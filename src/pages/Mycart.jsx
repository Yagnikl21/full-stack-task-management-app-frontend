import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeItem, clearCart } from "../store/cartSlice";
import { api } from "../services/apiSevice"; // API service file
import { endpoints } from "../services/endpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCart = () => {
   const { items, totalAmount } = useSelector((state) => state.cart); // Access cart state
   const [loading, setLoading] = useState(false); // Loading state for placing an order
   const dispatch = useDispatch();

   const handlePlaceOrder = async () => {
      try {
         setLoading(true); // Set loading to true before making the API call
         const orderData = {
            items: items.map((item) => ({
               menuItemId: item._id,
               quantity: item.quantity,
            })),
            totalAmount,
         };

         const response = await api.post(endpoints.PLACE_ORDER, orderData);
         if (response.success) {
            toast.success("Order placed successfully!", {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
         } else {
            toast.error(response.error.error, {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
         }

         dispatch(clearCart()); // Clear the cart after placing an order
      } catch (error) {
         console.error("Error placing order:", error);
         toast.error("Failed to place order. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      } finally {
         setLoading(false); // Set loading to false after the API call
      }
   };

   return (
      <div className="p-6 bg-gray-100 min-h-screen">
         <h1 className="text-2xl font-bold mb-6">My Cart</h1>

         {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
         ) : (
            <div>
               {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 shadow rounded">
                     <div>
                        <h2 className="font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                     </div>
                     <div className="flex space-x-2">
                        <button
                           onClick={() => dispatch(decrementQuantity({ id: item.id }))}
                           className="px-3 py-1 bg-red-500 text-white rounded"
                           disabled={item.quantity === 1}
                        >
                           -
                        </button>
                        <button
                           onClick={() => dispatch(incrementQuantity({ id: item.id }))}
                           className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                           +
                        </button>
                        <button
                           onClick={() => dispatch(removeItem({ id: item.id }))}
                           className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                           Remove
                        </button>
                     </div>
                  </div>
               ))}
               <div className="text-right font-bold text-lg">
                  Total Amount: ${totalAmount.toFixed(2)}
               </div>
               <div className="flex justify-between items-center mt-6">
                  <button
                     onClick={() => dispatch(clearCart())}
                     className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                     Clear Cart
                  </button>
                  <button
                     onClick={handlePlaceOrder}
                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                     disabled={loading} // Disable the button while loading
                  >
                     {loading ? "Placing Order..." : "Place Order"}
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default MyCart;
