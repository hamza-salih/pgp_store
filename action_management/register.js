// const express = require('express');
// const router = express.Router();
// const userQueries = require('../access_bd/user_queries');

// router.post('/', async (req, res) => {
//     try {
//         const { username, password, email, address, pgp_key } = req.body;
//         await userQueries.registerUser(username, password, email, address, pgp_key);
//         res.redirect('../ihm/encrypt.html');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;
