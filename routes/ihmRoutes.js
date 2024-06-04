const express = require('express');
const path = require('path');
const { getUserByUsername } = require('../access_db/user_queries');
const router = express.Router();

router.get('/fetch_public_key', async (req, res) => {
  if (!req.session.username) {
    res.json({ error: 'User not logged in.' });
  } else {
    const user = await getUserByUsername(req.session.username);
    if (user) {
      res.json({ publicKey: user.PGPKey });
    } else {
      res.json({ error: 'User not found.' });
    }
  }
});

// router.post('/store_random_message', (req, res) => {
//   const { randomMessage } = req.body;
//   if (randomMessage) {
//     req.session.randomMessage = randomMessage;
//     res.send("Random message stored in session successfully.");
//   } else {
//     res.status(400).send("Random message not found in POST data.");
//   }
// });

module.exports = router;
