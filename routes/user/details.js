const express = require('express');
const router = express.Router();
const { getUserByUsername } = require('../../access_db/user_queries'); // Adjust the path as needed

router.get('/details', async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching user details' });
    }
});

module.exports = router;
