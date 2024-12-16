const { getDB } = require("../../database/db");

const updateBookModel = async (
  bookID,
  title,
  authorName,
  genreList,
  genreDescription,
  pages
) => {
  try {
    const db = await getDB();
    await db.exec("BEGIN TRANSACTION");

    const bookParams = [];
    const updateFields = [];

    if (title) {
      updateFields.push("title = ?");
      bookParams.push(title);
    }

    if (pages !== undefined && pages !== null) {
      const pagesNumber = Number(pages);
      if (!isNaN(pagesNumber)) {
        updateFields.push("pages = ?");
        bookParams.push(pagesNumber);
      } else {
        console.error("Invalid number for pages:", pages);
      }
    }

    if (updateFields.length > 0) {
      const updateBookQuery = `
        UPDATE Books
        SET ${updateFields.join(", ")}
        WHERE bookID = ?`;

      bookParams.push(bookID);
      // console.log("Update Books Query:", updateBookQuery);
      // console.log("Book Params:", bookParams);

      await db.run(updateBookQuery, bookParams);
    }

    if (authorName) {
      const updateAuthorQuery = `
        UPDATE Authors
        SET Name = ?
        WHERE AuthorID = (SELECT AuthorID FROM Books WHERE bookID = ?)`;

      // console.log("Update Authors Query:", updateAuthorQuery);
      await db.run(updateAuthorQuery, [authorName, bookID]);
    }

    // console.log("level 4");
    if (genreList || genreDescription) {
      const updateGenreQuery = `
        UPDATE Genres
        SET Names = ?, Description = ?
        WHERE GenreID = (SELECT GenreID FROM Books WHERE bookID = ?)`;

      // console.log("Update Genres Query:", updateGenreQuery);
      await db.run(updateGenreQuery, [
        JSON.stringify(genreList),
        genreDescription,
        bookID,
      ]);
    }

    // console.log("level 5");

    await db.exec("COMMIT");
    // console.log("Book Updated Successfully...");
  } catch (error) {
    await db.exec("ROLLBACK");
    console.error("Error updating book:", error.message);
    throw new Error("Failed to update book");
  }
};

module.exports = updateBookModel;
