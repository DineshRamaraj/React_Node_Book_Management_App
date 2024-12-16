const getBookModel = require("../../models/bookModel/getBookModel");

const getBook = async (req, res) => {
  const { bookID } = req.params;
  try {
    const books = await getBookModel(bookID);
    // console.log(books);
    if(!books){
      throw new Error("No Book Record Found..");
    }
    res.status(200).json({ status: true, booksList: books });
  } catch (error) {
    // console.error(error.message);
    res.status(500).json({
      status: false,
      error_msg: error.message,
    });
  }
};

module.exports = getBook;
