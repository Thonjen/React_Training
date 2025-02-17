import { useEffect, useState } from "react";

function CommentList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
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
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-black">Comment List</h1>
      <table className="table-auto w-full mt-6 border-collapse">
        <thead>
          <tr className="bg-yellow-500 text-black">
            <th className="px-4 py-2">Post ID</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((comment) => (
            <tr key={comment.id} className="even:bg-yellow-100">
              <td className="px-4 py-2">{comment.postId}</td>
              <td className="px-4 py-2">{comment.id}</td>
              <td className="px-4 py-2">{comment.name}</td>
              <td className="px-4 py-2">{comment.email}</td>
              <td className="px-4 py-2">{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentList;
