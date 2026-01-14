import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/gigs", { title, description, budget });
    navigate("/");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Gig</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Budget" onChange={e => setBudget(e.target.value)} />
      <button>Create</button>
    </form>
  );
};

export default CreateGig;
