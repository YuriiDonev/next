const express = require('express');
const router = express.Router();

const booksController = require('../controllers/book.js');

router.post('', booksController.saveBook);
router.get('', booksController.getBooks);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
