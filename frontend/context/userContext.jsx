import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch current logged-in user info to check auth status
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/user", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error fetching current user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const signup = async (formData) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        await fetchCurrentUser();
        alert("Signup successful");
      } else {
        const err = await res.json();
        alert(err.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  const login = async (formData) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        await fetchCurrentUser();
      } else {
        const err = await res.json();
        alert(err.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
    setUser(null);
  };

  const createPost = async (formData) => {
    try {
      const res = await fetch("http://localhost:8000/api/posts/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create a post");
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/posts/getpost", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load your posts");
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  // inside UserProvider context

const getPostById = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch post");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (id, formData) => {
  try {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete post");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <UserContext.Provider
      value={{ user, signup, login, logout, createPost, getPosts , getPostById,deletePost,updatePost }}
    >
      {children}
    </UserContext.Provider>
  );
};
