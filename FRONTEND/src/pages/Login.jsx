import { useNavigate } from "@tanstack/react-router";
import AuthInput from "../components/AuthInput";
import { Link } from "@tanstack/react-router";
import { login } from "../api/auth/route";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate  = useNavigate()
  const auth = useSelector((state)=> state.auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const data = await login(formData); // this will throw on error automatically
        console.log(data)
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        setMessage(data.message); // show success message
        navigate({to:"/dashboard"}); 
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <AuthInput type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
