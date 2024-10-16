const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Lấy danh sách sách
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tạo sách (hoặc thêm các API khác như cập nhật, xóa)
router.post('/', async (req, res) => {
    const { title, author } = req.body;
    const book = new Book({ title, author });
    try {
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
