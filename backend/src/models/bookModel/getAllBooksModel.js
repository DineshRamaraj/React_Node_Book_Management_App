const { getDB } = require("../../database/db");

const getAllBooksModel = async (searchQuery = "", authorID, genreID) => {
  try {
    const db = getDB();

    let query = `
      SELECT 
      books.bookid AS book_id,
      books.title AS title,
      books.authorid AS author_id,
      books.genreid AS genre_id,
      books.pages AS pages,
      books.publishedDate AS published_date,
      authors.name AS author_name,
      genres.names AS genre_names,
      genres.description AS genre_description
      FROM Books 
      INNER JOIN Authors ON Authors.authorID = Books.authorID
      INNER JOIN Genres ON Genres.genreID = Books.genreID
      WHERE Title LIKE ?`;

    let params = [`%${searchQuery}%`];

    if (authorID) {
      query += " AND Books.authorID = ?";
      params.push(authorID);
    }
    if (genreID) {
      query += " AND Books.genreID = ?";
      params.push(genreID);
    }

    const books = await db.all(query, params);
    // console.log(books);
    const updatedBooks = books.map((book) => ({
      ...book,
      genre_names: JSON.parse(book.genre_names),
    }));
    return updatedBooks;
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
};

module.exports = getAllBooksModel;
