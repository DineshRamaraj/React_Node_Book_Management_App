import React from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const book = { title: "Book Title", author: "Book Author", genre: "Fiction", pages: 300, publishedDate: "2021-01-01" };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p className="text-gray-700">Author: {book.author}</p>
      <p className="text-gray-700">Genre: {book.genre}</p>
      <p className="text-gray-700">Pages: {book.pages}</p>
      <p className="text-gray-700">Published Date: {book.publishedDate}</p>
    </div>
  );
};

export default BookDetails;
