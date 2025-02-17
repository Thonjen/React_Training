import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import React, { useEffect, useState } from "react";

function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState("albums");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ userId: "", title: "", body: "" });

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/${selectedDataset}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [selectedDataset]);

  const handleModalToggle = (item = null) => {
    setEditingItem(item);
    setModalOpen(!modalOpen);
    setNewItem(item ? { ...item } : { userId: "", title: "", body: "" });
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = () => {
    if (editingItem) {
      setData(data.map((item) => (item.id === editingItem.id ? { ...editingItem, ...newItem } : item)));
    } else {
      setData([{ id: data.length + 1, ...newItem }, ...data]);
    }
    setModalOpen(false);
  };

  return (
    <div className="">
      <div className="w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
        <div className="text-2xl font-bold text-black drop-shadow-xl">Data Explorer</div>
      </div>

      {/* Dataset buttons */}
      <div className="flex flex-wrap justify-center space-x-4 p-4">
        {["albums", "comments", "photos", "posts", "todos"].map((dataset) => (
          <motion.button
            key={dataset}
            onClick={() => setSelectedDataset(dataset)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full sm:w-auto border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${
              selectedDataset === dataset
                ? "text-black border-yellow-600 font-bold"
                : "hover:text-black"
            }`}
          >
            {dataset.charAt(0).toUpperCase() + dataset.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold text-black mb-6">Manage Your Data</h1>

        {/* Create New Item Button */}
        <motion.button
          onClick={() => handleModalToggle()}
          whileHover={{ scale: 1.05 }}
          className="w-full sm:w-auto border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg mb-4"
        >
          Create New Item
        </motion.button>

        {loading ? (
          <p className="text-center text-black">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error.message}</p>
        ) : (
          <div className="overflow-x-auto">
            {/* Responsive Table Layout */}
            <div className="block sm:hidden">
              {/* Mobile Card View */}
              {data.map((item) => (
                <div key={item.id} className="mb-4 p-4 bg-white bg-opacity-70 border-2 border-yellow-300 rounded-xl shadow-xl">
                  <p><strong>User ID:</strong> {item.userId}</p>
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Body:</strong> {item.body}</p>
                  <div className="mt-2 flex flex-col space-y-2">
                    <motion.button
                      onClick={() => handleModalToggle(item)}
                      whileHover={{ scale: 1.1 }}
                      className="w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => setData(data.filter((i) => i.id !== item.id))}
                      whileHover={{ scale: 1.1 }}
                      className="w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <table className="min-w-full bg-white bg-opacity-70 backdrop-blur-xl border-2 border-yellow-300 rounded-xl shadow-xl">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-black">
                    <th className="py-3 px-4 text-left">User ID</th>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Body</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-b border-yellow-300 hover:bg-yellow-100">
                      <td className="py-3 px-4">{item.userId}</td>
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">{item.body}</td>
                      <td className="py-3 px-4 space-x-2">
                        <motion.button
                          onClick={() => handleModalToggle(item)}
                          whileHover={{ scale: 1.1 }}
                          className="w-full sm:w-auto border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          onClick={() => setData(data.filter((i) => i.id !== item.id))}
                          whileHover={{ scale: 1.1 }}
                          className="w-full sm:w-auto border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                          Delete
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 sm:w-1/3 border-2 border-yellow-500 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-black mb-4">
              {editingItem ? "Edit Item" : "Create New Item"}
            </h2>
            <input
              type="text"
              name="userId"
              value={newItem.userId}
              onChange={handleInputChange}
              placeholder="User ID"
              className="w-full p-3 mb-2 border-2 border-yellow-500 rounded-lg bg-opacity-50 focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              name="title"
              value={newItem.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-3 mb-2 border-2 border-yellow-500 rounded-lg bg-opacity-50 focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              name="body"
              value={newItem.body}
              onChange={handleInputChange}
              placeholder="Body"
              className="w-full p-3 mb-4 border-2 border-yellow-500 rounded-lg bg-opacity-50 focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <motion.button
                onClick={handleCreateOrUpdate}
                whileHover={{ scale: 1.1 }}
                className="w-full sm:w-auto border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                {editingItem ? "Update" : "Create"}
              </motion.button>
              <motion.button
                onClick={() => setModalOpen(false)}
                whileHover={{ scale: 1.1 }}
                className="w-full sm:w-auto border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataList;
