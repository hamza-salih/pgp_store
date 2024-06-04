// const express = require('express');
// const router = express.Router();
// const { getUserByUsername } = require('../access_db/user_queries');

// router.post('/', async (req, res) => {
//     const { username, decrypted_message } = req.body;
//     const user = await getUserByUsername(username);

//     if (user) {
//         // Set user data in session
//         req.session.username = username;
//         req.session.UserID = user.UserID;
//         req.session.correctUser = true;

//         // Check if decrypted_message is present
//         if (decrypted_message) {
//             // const original_message = req.session.randomMessage;
//             if (decrypted_message.trim() === original_message.trim()) {
//                 return res.redirect('/');
//             } else {
//                 return res.send('Invalid decrypted message, try again!');
//             }
//         }

//         // Set public key in session
//         req.session.publicKey = user.PGPKey;

//         return res.redirect('/IHM/encrypt.html');
//     } else {
//         return res.send('User not found.');
//     }
// });

// module.exports = router;
