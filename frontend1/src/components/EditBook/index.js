import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();

  // Mock data: Replace this with actual data fetched via API
  const initialBookDetails = {
    title: "Sample Title",
    author: "Sample Author",
    genre: "Fiction",
    pages: 350,
    publishedDate: "2020-01-01",
  };

  const [book, setBook] = useState(initialBookDetails);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Book Details:", book);
    alert("Book updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
      {["title", "author", "genre", "pages", "publishedDate"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={`Enter ${field}`}
          value={book[field]}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Update Book
      </button>
    </form>
  );
};

export default EditBook;
