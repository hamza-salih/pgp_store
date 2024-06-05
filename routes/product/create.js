const express = require('express');
const router = express.Router();
const { create_product } = require('../../access_db/user_queries');

router.post('/', async (req, res) => {
    const { UserID } = req.session;
    const UserID_FK = UserID;

    const currentDate = new Date();
    const Timestamp = currentDate;

    const {Name, Description, Price, Quantity, location_from, location_to } = req.body;
    await create_product(Name, Description, Price, Quantity, Timestamp, UserID_FK, location_from, location_to);
    res.redirect('login');
});

module.exports = router;
