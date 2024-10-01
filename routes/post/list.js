const express = require('express');
const router = express.Router();
const { Post } = require('../../access_db/product_queries');

router.get('/posts', async (req, res) => {
  try {

    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

module.exports = router;
