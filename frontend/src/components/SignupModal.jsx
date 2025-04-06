import React, { useState } from "react";
import axios from "axios";

const SignupModal = ({ isOpen, onClose, openLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation (password field should not be empty)
    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      const response = await axios.post("http://3.109.158.27:5000/api/signup", {
        email,
        password,
      });
      localStorage.setItem("userId", response.data.result._id);
      localStorage.setItem("token", response.data.token);
      console.log("Signup successful:");
      onClose(); // Close modal on success
      // You can redirect to login or directly log the user in
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose(); // Close the signup modal
    openLoginModal(); // Open the login modal
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
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Create Account
          </button>
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
