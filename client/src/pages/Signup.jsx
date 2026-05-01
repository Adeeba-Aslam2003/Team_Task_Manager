import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Developer",   // ✅ default fix
    title: "Engineer",   // ✅ default fix
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://teamtaskmanager-production-1362.up.railway.app/users/register",
        form,
        {
          withCredentials: true, // 🔥 VERY IMPORTANT
        }
      );

      console.log(res.data);
      alert("Signup success! Now login");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;