const express = require('express');
const router = express.Router();
const { update_user } = require('../../access_db/user_queries');

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { displayName, Username, Password, Email, Address, PGPKey, pin, utype } = req.body;

  console.log(`Update request for userID: ${id} with data:`, { displayName, Username, Password, Email, Address, PGPKey, pin, utype });

  try {
    // Prepare the updated data object
    const updatedData = {
      displayName,
      Username,
      Password: Password ? await bcrypt.hash(Password, 10) : undefined, // Hash new password if provided
      Email,
      Address,
      PGPKey,
      pin: pin ? await bcrypt.hash(String(pin), 10) : undefined, // Hash new pin if provided
      utype
    };

    // Remove undefined keys
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    const updatedCount = await update_user(id, updatedData);

    if (updatedCount > 0) {
      console.log('User updated successfully:', id);
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      console.log('User not found:', id);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
});

module.exports = router;
