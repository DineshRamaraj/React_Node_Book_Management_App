const { getDB } = require("../../database/db");

const deleteBookModel = async (bookID) => {
  try {
    const db = getDB();

    await db.exec("BEGIN TRANSACTION");

    const query1 = `DELETE FROM books WHERE bookID= ?`;

    const result = await db.run(query1, [bookID]);

    if (result.changes === 0) {
      throw new Error(`No book found with bookID: ${bookID}`);
    }

    await db.exec("COMMIT");
    
  } catch (error) {
    await db.exec("ROLLBACK");
    console.log("Error delete book:", error.message);
    throw new Error("Failed to delete book");
  }
};

module.exports = deleteBookModel;
