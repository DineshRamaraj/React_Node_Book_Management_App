const addBook = require('../controllers/book/addBook');
const deleteBook = require('../controllers/book/deleteBook');
const getAllBooks = require('../controllers/book/getAllBooks');
const getBook = require('../controllers/book/getBook');
const updateBook = require('../controllers/book/updateBook');

const router = require('express').Router();

router.get("/books", getAllBooks);
router.post("/books", addBook);
router.get("/books/:bookID", getBook);
router.put("/books/:bookID", updateBook);
router.delete("/books/:bookID", deleteBook);

module.exports = router;