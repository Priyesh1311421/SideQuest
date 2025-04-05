import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ isOpen, onClose, openSignupModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      onClose(); 
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onClose(); // Close the login modal
    openSignupModal(); // Open the signup modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-30">
      <div className="bg-white p-6 rounded-xl w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && (
            <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
          <p className="text-sm text-center mt-2">
            New to SideQuest?{" "}
            <button
              onClick={handleSignupClick}
              className="text-blue-600 hover:underline font-medium"
            >
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;