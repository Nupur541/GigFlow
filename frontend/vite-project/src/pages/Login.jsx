import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    navigate("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

export default Login;
