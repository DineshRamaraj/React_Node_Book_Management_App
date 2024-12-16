const addBookModel = require("../../models/bookModel/AddBookModel");

const addBook = async (req, res) => {
  console.log(req.body);
  const { title, authorName, genreNames, genreDescription, pages } = req.body;
  try {
    const { bookID, authorID, genreID } = await addBookModel(
      title,
      authorName,
      genreNames,
      genreDescription,
      pages
    );
    res
      .status(201)
      .json({ status: true, message: "Book Added", bookID, authorID, genreID });
    console.log("Book Added Success");
  } catch (error) {
    console.log("Error Found in Add Book");
    res.status(500).json({ status: false, error_msg: error.message });
  }
};

module.exports = addBook;
