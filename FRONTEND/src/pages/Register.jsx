import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "@tanstack/react-router";
import { register } from "../api/auth/route";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      console.log(data)
      useDispatch(loginSuccess({ user: data.user, token: data.token }));
      setMessage(data.message); // show success message
      navigate("/"); 
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <AuthInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <AuthInput type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
