// const express = require('express');
// const router = express.Router();
// const userQueries = require('../access_bd/user_queries');

// router.post('/', async (req, res) => {
//     const { username, decrypted_message } = req.body;
//     const user = await getUserByUsername(username);

//     if (user) {
//         // Set user data in session
//         req.session.username = username;
//         req.session.UserID = user.UserID;
//         req.session.correctUser = true;

//         // Set random message from session if available
//         if (req.session.randomMessage) {
//             // const original_message = req.session.randomMessage;
//             if (decrypted_message && decrypted_message.trim() === original_message.trim()) {
//                 return res.redirect('/IHM/index.html');
//             } else {
//                 return res.send('error !');
//             }
//         } else {
//             return res.send('Random message not found.');
//         }

//         // Set public key in session
//         req.session.publicKey = user.PGPKey;

//         return res.redirect('/IHM/encrypt.html');
//     } else {
//         return res.send('User not found.');
//     }
// });



// module.exports = router;
