import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function signin(e: React.FormEvent) {
    e.preventDefault();

    const usernameOrEmail = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!usernameOrEmail || !password) {
      setError("Username/email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signin", {
        usernameOrEmail,
        password,
      });

      // localStorage.setItem("token", response.data.token);
      const token = response.data.token;
      const user = response.data.user;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      const returnTo = location.state?.returnTo || "/";
      navigate(returnTo);

      console.log("Token saved:", token);
      navigate(returnTo);
    } catch (error: any) {
      const message = error.response?.data?.message || "Invalid credentials.";
      setError(message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 pt-16">
      <div className="bg-white p-8 rounded-4xl shadow-lg border-2 border-gray-300 w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign In</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={signin} className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            ref={usernameRef}
            required
            className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
