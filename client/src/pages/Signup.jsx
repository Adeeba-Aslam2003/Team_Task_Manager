import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    title: "dev",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://teamtaskmanager-production-1362.up.railway.app/api/users/register",
        form
      );
      alert("Signup success! Now login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;