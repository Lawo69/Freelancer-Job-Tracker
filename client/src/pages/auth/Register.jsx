import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import RegisterImage from "/assets/img/register-image.jpg";
import { useAuth } from "../../hooks/useAuth";
import { registerUser } from '../../api/auth'

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault()
  const fullName = `${firstName.trim()} ${lastName.trim()}`

  try {
    const res = await registerUser(fullName, email, password)

    const token = res.data.token
    const user = {
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email
    }

    login(token, user)
    toast.success("Registration successful!")
    navigate("/")
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed")
  }
}

  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-primary">
      <div className="flex flex-col md:flex-row w-full max-w-7xl shadow-xl rounded-2xl overflow-hidden bg-secondary text-white">
        
        {/* Left side image section */}
        <div className="hidden md:flex basis-1/2 relative max-h-[500px]">
          <div className="relative w-full h-[500px]">
            <img
              src={RegisterImage}
              alt="register"
              className="w-full h-full object-cover opacity-80 rounded-l-2xl"
            />
            <div className="absolute top-4 left-4">
              <span className="text-white font-bold text-xl leading-6">
                Freelancer<br />Job<br />Tracker
              </span>
            </div>
            <div className="absolute bottom-6 left-6 text-lg font-light">
              Manage Pressure,<br /> Create a Card.
            </div>
          </div>
        </div>
        
        {/* Right side form section */}
        <div className="flex justify-center items-center w-full md:w-1/2 px-6 py-10">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
            <p className="text-sm text-gray-400 mb-6">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-400 hover:underline">
                Log in
              </a>
            </p>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 px-4 py-2 bg-gray-800 rounded-lg outline-none text-white placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 px-4 py-2 bg-gray-800 rounded-lg outline-none text-white placeholder-gray-400"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg outline-none text-white placeholder-gray-400"
                required
              />
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg outline-none text-white placeholder-gray-400"
                  required
                />
                <span
                  className="absolute right-4 top-2 text-gray-400 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold cursor-pointer"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
