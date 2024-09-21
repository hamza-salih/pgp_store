const express = require('express');
const router = express.Router();
const { create_post } = require('../../access_db/product_queries');

router.post('/', async (req, res) => {
    const { Title, Content, AuthorID, Tags, IsPublished } = req.body;

    try {
        const newPost = await create_post(Title, Content, AuthorID, Tags, IsPublished);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

module.exports = router;
