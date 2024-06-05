const express = require('express');
const router = express.Router();
const { create_product } = require('../../access_db/product_queries');

router.post('/', async (req, res) => {
    const { UserID } = req.session;
    const UserID_FK = UserID;

    if (!req.session.username) {
        return res.json({ error: "User not logged in." });
      }
    
    const currentDate = new Date();
    const Timestamp = currentDate;

    const {Name, Description, Price, Quantity, location_from, location_to, type } = req.body;
    await create_product(Name, Description, Price, Quantity, Timestamp, UserID_FK, location_from, location_to, type);
    res.redirect('login');
});

module.exports = router;
