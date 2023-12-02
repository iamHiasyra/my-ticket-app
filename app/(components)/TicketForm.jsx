"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
    const router = useRouter();

  const startData = {
    title: "",
    description: "",
    category: "problem",
    priority: 1,
    progress: 0,
    status: "none",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({formData}),
        "content-type" : "application/json"
    })

    if(!res.ok) {
        throw new Error("Failed to create Ticket")
    }

    router.refresh()
    router.push("/")
  };

  const [formData, setFormData] = useState(startData);

  return (
    <div className="flex justify-center">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>Create Your Ticket</h3>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label htmlFor="description">description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />

        <label htmlFor="category">category</label>
        <select
          name="category"
          onChange={handleChange}
          required
          value={formData.category}
        >
          <option value="problem">problem</option>
          <option value="note">note</option>
          <option value="project">project</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <div>
          <input
            type="radio"
            id="priority-1"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="priority-1">1</label>
          <input
            type="radio"
            id="priority-2"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="priority-2">2</label>
          <input
            type="radio"
            id="priority-3"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="priority-3">3</label>
          <input
            type="radio"
            id="priority-4"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="priority-5">5</label>
          <input
            type="radio"
            id="priority-5"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label htmlFor="progress">Progress</label>
        <input type="range" name="progress" id="progress" value={formData.progress} min="0" max={100} onChange={handleChange}/>

        <label>Status</label>
        <select name="status" id="status" value={formData.status} onChange={handleChange}>
            <option value="none"> none </option>
            <option value="started"> started </option>
            <option value="working"> working </option>
            <option value="done"> done </option>
        </select>

        <input type="submit" className="btn max-w-sm" value="Create" />

      </form>
    </div>
  );
};

export default TicketForm;
