import { useEffect, useState } from "react";
import { api } from "../services/apiSevice";
import Modal from "../components/Modal";
import { endpoints } from "../services/endpoint";
import { useNavigate, useSearchParams } from "react-router";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import CustomPagination from '../components/CustomPagination';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Holds the item being added or edited
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = searchParams.get('pageno');
  const [page, setPage] = useState(pageNo ? parseInt(pageNo, 10) : 1);
  const [pageInformation, setPageInfo] = useState({});
  const pageSize = 9;
  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${endpoints.GET_ITEMS}?page=${page}&limit=${pageSize}`, {}, navigate);
      setItems(response.data.page_data);
      setPageInfo(response.data.page_information);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  // Handle opening the modal
  const handleModalOpen = (item = null) => {
    setCurrentItem(item || { name: "", category: "", price: "", availability: true });
    setIsModalOpen(true);
  };

  // Handle saving (add or edit) item
  const handleSaveItem = async () => {
    try {
      setLoading(true);
      if (currentItem._id) {
        // Edit existing item
        const response = await api.patch(`${endpoints.EDIT_ITEM}/${currentItem._id}`, currentItem, navigate);
        fetchItems(); 
        toast.success("Item updated successfully!");
      } else {
        // Add new item
        const response = await api.post(endpoints.ADD_ITEMS, currentItem, navigate);
        fetchItems(); 
        toast.success("Item added successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    dispatch(addItem(item));
    toast.success(`${item.name} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="h-full">
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => handleModalOpen()}
          >
            Add New Item
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-600">No items to display</div>
        ) : (
          <div className="grow overflow-y-auto">
            <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative p-4 max-h-max bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <button
                    className="absolute top-2 right-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-1"
                    onClick={() => handleModalOpen(item)}
                  >
                    ✏️
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <span className="text-lg font-bold text-green-600">${item.price}</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${item.availability ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                        }`}
                    >
                      {item.availability ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                  {item.availability && (
                    <button
                      className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {
          <CustomPagination
            page={page}
            pageInformation={pageInformation}
            setPage={setPage}
            totalPages={pageInformation?.last_page}
          />
        }
      </div>

      {/* Add/Edit Item Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">
            {currentItem.id ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveItem();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Item name"
              value={currentItem.name}
              onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={currentItem.category}
              onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={currentItem.price}
              onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={currentItem.availability}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, availability: e.target.value === "true" })
              }
              className="w-full p-2 border rounded"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
