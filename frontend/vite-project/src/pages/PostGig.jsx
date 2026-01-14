import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const PostGig = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/gigs", form);
    navigate("/");
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Post Gig</h2>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Budget" onChange={e => setForm({ ...form, budget: e.target.value })} />
      <button>Post</button>
    </form>
  );
};

export default PostGig;
