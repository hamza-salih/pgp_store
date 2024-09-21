const express = require('express');
const router = express.Router();
const { Post } = require('./path/to/postModel');

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Post.destroy({ where: { PostID: id } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
});

module.exports = router;
