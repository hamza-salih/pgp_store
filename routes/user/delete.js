const express = require('express');
const router = express.Router();
const { delete_user } = require('../../access_db/user_queries');

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await delete_user(id);
        if (deletedUser) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
module.exports = router;
