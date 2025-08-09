import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "/context/UserContext.jsx";

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, updatePost, deletePost } = useContext(UserContext);

  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id);
      if (!data) {
        alert("Post not found");
        navigate("/home");
        return;
      }
      setPost(data);
      setForm({ title: data.title, content: data.content });
    };
    fetchPost();
  }, [id, getPostById, navigate]);

  const handleEditToggle = () => setEditing(!editing);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill all fields");
      return;
    }
    const updated = await updatePost(id, form);
    setPost(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      navigate("/home");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black text-gray-800 px-4 py-10">
      <div
        className="w-full max-w-lg bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 rounded-xl shadow-xl p-8 text-black flex flex-col
                   animate-fadeIn
                   sm:p-10"
      >
        {editing ? (
          <>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full h-14 mb-6 rounded border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition sm:text-lg"
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="8"
              placeholder="Write your post here..."
              required
              className="w-full rounded border border-gray-300 bg-white p-4 mb-6 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition sm:text-lg"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="bg-pink-500 hover:bg-pink-600 text-black px-6 py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-pink-500 mb-6">{post.title}</h1>
            <p className="mb-10 whitespace-pre-wrap sm:text-lg text-gray-700">{post.content}</p>
            <div className="flex justify-between items-center">
              <small className="text-gray-600 text-sm sm:text-base">
                Created: {new Date(post.createdAt).toLocaleString()}
              </small>
              <div className="space-x-4">
                <button
                  onClick={handleEditToggle}
                  className="bg-pink-500 hover:bg-pink-600 text-grey px-6 py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-grey px-6 py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PostView;
