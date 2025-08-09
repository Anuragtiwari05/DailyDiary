import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "/context/UserContext.jsx";

function Signup() {
  const { signup } = useContext(UserContext);
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate("/home");
    } catch (error) {
      alert("Signup Failed");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black text-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 rounded-xl shadow-xl p-8 text-gray-800 flex flex-col
                   animate-fadeIn
                   sm:p-10"
      >
        <p className="text-[15px] sm:text-lg font-semibold mb-4">
          Welcome to <span className="text-[40px] sm:text-5xl font-bold"> DailyDiary</span>
        </p>
        <input
          className="w-full h-10 sm:h-12 border-2 border-gray-300 rounded-md p-2 mb-6 mt-10 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          name="userName"
          placeholder="Username"
          value={form.userName}
          autoComplete="username"
          onChange={handleChange}
          required
        />
        <input
          className="w-full h-10 sm:h-12 border-2 border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
        />
        <input
          className="w-full h-10 sm:h-12 border-2 border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-grey py-2 sm:py-3 rounded-md font-semibold transition shadow-md hover:shadow-lg"
        >
          Sign up
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
