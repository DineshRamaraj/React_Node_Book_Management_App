import React, { useState } from "react";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genreNames: "",
    genreDescription: "",
    pages: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object
    const newObject = {
      title: book.title,
      authorName: book.author,
      genreNames: book.genreNames,
      genreDescription: book.genreDescription,
      pages: book.pages,
    };

    // API endpoint
    const apiUrl = "https://api-book-manage.onrender.com/api/books";

    // Options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject), // Convert the object to JSON
    };

    try {
      // Send the request
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Book added successfully:", result);

      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add the book. Please try again.");
    }
    setBook({
      title: "",
      author: "",
      genreNames: "",
      genreDescription: "",
      pages: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 mb-10 border border-slate-400 p-2 px-4 rounded-md"
    >
      <h2 className="text-2xl  mb-6 text-center font-[roboto]">Add New Book</h2>
      {["title", "author", "genreNames"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={`Enter ${field}`}
          value={book[field]}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
      ))}
      <textarea
        name="genreDescription"
        placeholder={`Enter genre Description`}
        value={book["genreDescription"]}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      ></textarea>
      {["pages"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={`Enter ${field}`}
          value={book[field]}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
