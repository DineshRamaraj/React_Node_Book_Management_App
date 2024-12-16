const { v4: uuidv4 } = require("uuid");
const { getDB } = require("../../database/db");

const addBookModel = async (title, authorName, genreNames, genreDescription, pages) => {
  try {
    const db = getDB();

    const bookID = uuidv4();
    const newAuthorID = uuidv4();
    const newGenreID = uuidv4();

    await db.exec("BEGIN TRANSACTION");

    // console.log("level 1");
    const query1 = `INSERT INTO Authors(AuthorID, Name) VALUES(?, ?)`;
    await db.run(query1, [newAuthorID, authorName]);

    // console.log("level 2");
    const query2 = `INSERT INTO Genres(GenreID, Names, Description) VALUES(?, ?, ?)`;
    await db.run(query2, [newGenreID, JSON.stringify(genreNames), genreDescription]);

    // console.log("level 3");
    const query3 = `INSERT INTO books(bookID, Title, AuthorID, GenreID, Pages, PublishedDate)
              Values(?, ?, ?, ?, ?, ?)`;
    await db.run(query3, [
      bookID,
      title,
      newAuthorID,
      newGenreID,
      pages,
      new Date().toISOString(),
    ]);

    // console.log(4);
    await db.exec("COMMIT");

    // console.log("Book Added Successfully...");
    return { bookID, authorID: newAuthorID , genreID: newGenreID};
  } catch (error) {
    await db.exec("ROLLBACK");
    // console.error("Error adding book: ", error.message);
    throw new Error("Failed to add book");
  }
};

module.exports = addBookModel;
