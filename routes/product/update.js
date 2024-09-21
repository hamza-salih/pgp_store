const express = require('express');
const router = express.Router();
const { Post } = require('./path/to/postModel');

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, Content, Tags, IsPublished } = req.body;

    try {
        const [updated] = await Post.update(
            { Title, Content, Tags, IsPublished },
            { where: { PostID: id } }
        );

        if (updated) {
            const updatedPost = await Post.findByPk(id);
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
});

module.exports = router;
