import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "/context/UserContext.jsx";

function CreatePost() {
  const { createPost } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    await createPost(form);
    navigate("/home"); // Redirect to home after submit
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black text-grey px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 rounded-xl shadow-xl p-8 text-grey flex flex-col
                   animate-fadeIn
                   sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-pink-500">
          Create New Post
        </h2>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full h-12 sm:h-14 border-2 border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          required
        />
        <textarea
          name="content"
          placeholder="Write your post here..."
          rows="8"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border-2 border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400 transition resize-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-grey py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
