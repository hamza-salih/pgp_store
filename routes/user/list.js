const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../access_db/user_queries');

router.get('/display', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Ensure you implement and export getUserById
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id); // Implement this function
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

module.exports = router;  // This line is important!
