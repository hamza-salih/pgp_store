const express = require('express');
const router = express.Router();
const { Post } = require('../../access_db/product_queries');
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { Title, Content, Tags, IsPublished } = req.body;

    console.log(`Update request for PostID: ${id} with data:`, { Title, Content, Tags, IsPublished });

    try {
        const [updatedCount] = await Post.update(
            { Title, Content, Tags, IsPublished },
            { where: { PostID: id } }
        );

        if (updatedCount > 0) {
            console.log('Post updated successfully:', id);
            res.status(200).json({ message: 'Post updated successfully' }); // Send a success message
        } else {
            console.log('Post not found:', id);
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Error updating post', error });
    }
});

module.exports = router;
