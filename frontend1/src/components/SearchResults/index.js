import React from "react";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const books = [
    { id: 1, title: "Book 1", author: "Author 1", genre: "Fiction" },
    { id: 2, title: "Book 2", author: "Author 2", genre: "Non-Fiction" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Search Results</h2>
      <div className="grid grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-gray-700">Author: {book.author}</p>
            <p className="text-gray-700">Genre: {book.genre}</p>
            <Link
              to={`/book/${book.id}`}
              className="text-blue-600 hover:underline mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
