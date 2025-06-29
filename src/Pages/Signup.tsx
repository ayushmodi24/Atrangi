// import { useRef, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export function Signup() {
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   async function signup(e: React.FormEvent) {
//     e.preventDefault();

//     const username = usernameRef.current?.value.trim();
//     const password = passwordRef.current?.value;

//     if (!username || !password) {
//       setError("Username and password are required.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3000/home/signup", {
//         username,
//         password
//       });

//       // ✅ Store token in localStorage
//       localStorage.setItem("user", JSON.stringify({ token: res.data.token }));

//       alert("Signup successful!");
//       navigate("/"); // Redirect to home page
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Something went wrong.";
//       setError(message);
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-700 pt-16">
//       <div className="bg-white p-8 rounded-4xl shadow-lg border-2 border-gray-300 w-full max-w-sm">
//         <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h1>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={signup} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               ref={usernameRef}
//               required
//               className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               ref={passwordRef}
//               required
//               className="w-full p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition duration-300"
//             >
//               Sign Up
//             </button>
//           </div>

//           <div className="text-center text-sm text-gray-600">
//             <span>Already have an account? </span>
//             <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function signup(e: React.FormEvent) {
    e.preventDefault();

    const username = usernameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });

      // Save token and redirect
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
      navigate("/");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 pt-16">
      <div className="bg-white p-8 rounded-4xl shadow-lg border-2 border-gray-300 w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={signup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            ref={usernameRef}
            required
            className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
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
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
