const express = require('express');
const router = express.Router();
const { Post } = require('./path/to/postModel');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
});

module.exports = router;
