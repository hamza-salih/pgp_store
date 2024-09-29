const express = require('express');
const router = express.Router();
const { get_user_by_id } = require('../../access_db/user_queries');

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await get_user_by_id(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});

module.exports = router;
