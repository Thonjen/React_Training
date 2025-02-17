import { useEffect, useState } from "react";

function TodoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
<div className="container mx-auto p-6 space-y-10">
  <h1 className="text-5xl font-bold text-center text-yellow-500 mb-6">
    Todo List
  </h1>

  {loading && (
    <div className="text-center text-xl text-yellow-500">
      <p>Loading...</p>
    </div>
  )}
  {error && (
    <div className="text-center text-xl text-red-500">
      <p>Error: {error.message}</p>
    </div>
  )}

  <div className="space-y-6">
    {data.map((todo) => (
      <div key={todo.id} className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between space-x-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
        <div className="flex flex-col space-y-2">
          <h3 className="text-2xl font-semibold text-gray-800">{todo.title}</h3>
          <p className="text-sm text-gray-500">User ID: {todo.userId} | ID: {todo.id}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 text-sm rounded-full font-medium ${todo.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {todo.completed ? 'Completed' : 'Not Completed'}
          </div>
          <button className="text-yellow-500 hover:text-yellow-600 focus:outline-none">
            <img src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/pencil.svg" alt="Edit" className="w-5 h-5" />
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-center mt-10">
    <button className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors">
      Add Todo
    </button>
  </div>
</div>


  );
}

export default TodoList;
