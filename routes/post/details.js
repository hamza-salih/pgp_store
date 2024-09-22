const express = require('express');
const router = express.Router();
const { get_post_by_id } = require('../../access_db/product_queries');

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await get_post_by_id(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).json({ message: 'Error fetching post details' });
    }
});

module.exports = router;
