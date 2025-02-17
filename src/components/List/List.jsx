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
    <div className="min-h-screen  bg-gradient-to-br from-[#FFEB00] to-[#F8F8F8] p-6">
      <div className="flex justify-between items-center p-6 bg-yellow-500 shadow-md">
        <div className="text-2xl font-bold text-black">Data Explorer</div>
      </div>

      <div className="flex justify-center space-x-4 p-4">
        {["albums", "comments", "photos", "posts", "todos"].map((dataset) => (
          <button
            key={dataset}
            onClick={() => setSelectedDataset(dataset)}
            className={`px-4 py-2 rounded ${
              selectedDataset === dataset ? "bg-yellow-600 text-white" : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
          >
            {dataset.charAt(0).toUpperCase() + dataset.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold text-black mb-6">Manage Your Data</h1>
        <button
          onClick={() => handleModalToggle()}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 mb-4"
        >
          Create New Item
        </button>

        {loading ? (
          <p className="text-center text-black">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error.message}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md border-2 border-yellow-500 rounded">
              <thead>
                <tr className="bg-yellow-500 text-black">
                  <th className="py-2 px-4 text-left">User ID</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Body</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b border-yellow-300">
                    <td className="py-2 px-4">{item.userId}</td>
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4">{item.body}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleModalToggle(item)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setData(data.filter((i) => i.id !== item.id))}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3 border-2 border-yellow-500">
            <h2 className="text-xl font-semibold text-black mb-4">
              {editingItem ? "Edit Item" : "Create New Item"}
            </h2>
            <input
              type="text"
              name="userId"
              value={newItem.userId}
              onChange={handleInputChange}
              placeholder="User ID"
              className="w-full p-3 mb-2 border-2 border-yellow-500 rounded"
            />
            <input
              type="text"
              name="title"
              value={newItem.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-3 mb-2 border-2 border-yellow-500 rounded"
            />
            <textarea
              name="body"
              value={newItem.body}
              onChange={handleInputChange}
              placeholder="Body"
              className="w-full p-3 mb-4 border-2 border-yellow-500 rounded"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleCreateOrUpdate}
                className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
              >
                {editingItem ? "Update" : "Create"}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataList;
  