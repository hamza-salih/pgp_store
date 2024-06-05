const express = require('express');
const router = express.Router();
const { registerUser } = require('../../access_db/user_queries');

router.post('/', async (req, res) => {
    const { UserID } = req.session;
    const UserID_FK = UserID;

    const {Name, Description, Price, Quantity, Timestamp, location_from, location_to } = req.body;
    await create_product(Name, Description, Price, Quantity, Timestamp, UserID_FK, location_from, location_to);
    res.redirect('login');
});

module.exports = router;
