import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "/context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout, getPosts } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data || []);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null; // or a spinner while redirecting

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-blue-900 to-black text-gray-200 p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Welcome, <span className="text-pink-400">{user.userName}</span>
        </h1>
        <div className="flex space-x-4 items-center">
          {/* + Add Post Button */}
         {/* + Add Post Button */}
<button
  onClick={() => navigate("/create-post")}
  className="bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 text-gray-700   w-10 h-10 flex justify-center items-center rounded-md font-semibold text-3xl transition shadow-md hover:shadow-lg"
  aria-label="Add Post"
>
  +
</button>

{/* Logout Button */}
<button
  onClick={handleLogout}
  className="w-full sm:w-auto bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 text-gray-700 py-2 sm:py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg px-4"
>
  Logout
</button>

        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => navigate(`/post/${post._id}`)}
            className="cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-md h-48 flex flex-col justify-between hover:scale-105 transition-transform duration-200 animate-fadeIn"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-pink-300 truncate">{post.title}</h2>
            <p className="text-gray-300 overflow-hidden overflow-ellipsis line-clamp-3 text-sm sm:text-base">
              {post.content}
            </p>
            <small className="text-gray-500 text-xs sm:text-sm mt-2">
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
