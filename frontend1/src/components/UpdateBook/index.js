import React, { useState } from "react";

const UpdateBook = ({ existBook, setUpdateItem, getBooksList }) => {
  const [book, setBook] = useState({
    title: existBook.title,
    author: existBook.authorName,
    genreList: existBook.genreList,
    genreDescription: existBook.genreDescription,
    pages: existBook.pages,
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
      genreList: book.genreList,
      genreDescription: book.genreDescription,
      pages: book.pages,
    };

    // API endpoint
    const apiUrl = `https://api-book-manage.onrender.com/api/books/${existBook.bookId}`;

    // Options for the fetch request
    const options = {
      method: "PUT",
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
      console.log("Book updated successfully:", result);

      alert("Book Updated successfully!");
      setUpdateItem({ showUpdate: false });
      getBooksList();
    } catch (error) {
      console.error("Error Updating book:", error);
      alert("Failed to Update the book. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 mb-10 border border-slate-400 p-2 px-4 rounded-md"
    >
      <h2 className="text-2xl  mb-6 text-center font-[roboto]">Update Book</h2>
      {["title", "author", "genreList"].map((field) => (
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
      <div className="flex items-center gap-5">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Book
        </button>
        <button
          type="button"
          onClick={() => setUpdateItem({ showUpdate: false })}
          className="w-full bg-slate-100 border border-red-600 text-red-500 py-2 rounded-lg hover:bg-red-700 hover:text-white"
        >
          close
        </button>
      </div>
    </form>
  );
};

export default UpdateBook;
