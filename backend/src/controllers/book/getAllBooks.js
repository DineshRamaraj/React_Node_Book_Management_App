const getAllBooksModel = require("../../models/bookModel/getAllBooksModel");

const getAllBooks = async (req, res) => {
  const { searchQuery = "" } = req.query;
  try {
    const books = await getAllBooksModel(searchQuery);
    // console.log(books);
    if(books.length === 0){
      return res.status(400).json({status: false, error_msg: "No Books Record" })
    }
    res.status(200).json({ status: true, booksList: books });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      error_msg: "Failed to fetch books. Please try again later.",
    });
  }
};



module.exports = getAllBooks;
