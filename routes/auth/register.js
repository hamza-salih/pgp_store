const express = require('express');
const router = express.Router();
const { registerUser } = require('../../access_db/user_queries');

router.post('/', async (req, res) => {
    const { displayName, username, password, email, address, pgp_key, pin, utype } = req.body;
    await registerUser(displayName, username, password, email, address, pgp_key, pin, utype);
    res.redirect('login');
});

module.exports = router;
