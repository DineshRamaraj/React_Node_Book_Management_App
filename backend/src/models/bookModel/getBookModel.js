const { getDB } = require("../../database/db");

const getBookModel = async (bookID) => {
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
      WHERE bookID = ?`;

    return await db.get(query, [bookID]);
    
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
};

module.exports = getBookModel;
