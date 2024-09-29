const express = require('express');
const router = express.Router();
const { update_user, get_user_by_id } = require('../../access_db/user_queries');

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { displayName, Email, Address, PGPKey } = req.body;

  console.log('User ID:', id);
  console.log('Update Data:', { displayName, Email, Address, PGPKey });

  try {
    const updatedData = {
      displayName,
      Email,
      Address,
      PGPKey,
    };

    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    // Check if user exists first
    const user = await get_user_by_id(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedCount = await update_user(id, updatedData);

    if (updatedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(400).json({ message: 'No data was updated' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

module.exports = router;
