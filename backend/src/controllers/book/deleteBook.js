const deleteBookModel = require("../../models/bookModel/DeleteBookModel");

const deleteBook = async (req, res) => {
  const { bookID } = req.params;
  try {
    await deleteBookModel(bookID);
    res
      .status(200)
      .json({ status: true, message: "Book Deleted", bookID });
    console.log("Book Deleted Success");
  } catch (error) {
    console.log("Error Found in Delete Book");
    res.status(500).json({ status: false, error_msg: error.message });
  }
};

module.exports = deleteBook;
