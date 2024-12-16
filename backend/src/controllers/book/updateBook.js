const updateBookModel = require("../../models/bookModel/UpdateBookModel");

const updateBook = async (req, res) => {
  try {
    const { bookID } = req.params;
    const { title, authorName, genreList, genreDescription, pages } = req.body;
    console.log(req.params);
    console.log(req.body);
    await updateBookModel(
      bookID,
      title,
      authorName,
      genreList,
      genreDescription,
      pages
    );
    res.status(200).json({status: true, message: "Book Updated"});
  } catch (error) {
    console.log("Error Found in Book Updated");
    res.status(500).json({ status: false, error_msg: error.message });
  }
};

module.exports = updateBook;
