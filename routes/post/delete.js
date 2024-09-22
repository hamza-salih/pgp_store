const express = require('express');
const router = express.Router();
const { delete_post } = require('../../access_db/product_queries');

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await delete_post(id);
        if (deletedPost) {
            res.status(204).send();  // No content, meaning deletion was successful
        } else {
            res.status(404).json({ message: 'Post not found' });  // Post not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
});
module.exports = router;
