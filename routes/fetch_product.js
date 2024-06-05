// const express = require("express");
// const router = express.Router();
// const openpgp = require("openpgp");

// router.get("/", async (req, res) => {
//   if (!req.session.username) {
//     return res.json({ error: "User not logged in." });
//   }

//   const { ProductID, Name, Description, Price, Quantity, Timestamp, UserID_FK, location_from, location_to } = req.session; // belong to the


//   const { displayName, username, publickey, UserID } = req.session;
//   let { randomMessage } = req.session;

//   if (!ProductID) {
//     return res.json({ error: "Error finding the product !" });
//   }else if (ProductID, Name, Description, Price, Quantity, Timestamp, UserID_FK, location_from, location_to) {
//     return res.json({
//         Name,
//         Price,
//         Quantity,
//         Timestamp,
//         UserID_FK,
//         location_from,
//         location_to
//       });
//   } else {
//     return res.json({ error: "No public key." });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const { Product } = require("../access_db/user_queries"); // Import the Product model and relevant functions

router.get("/", async (req, res) => {
    if (!req.session.username) {
        return res.json({ error: "User not logged in." });
        
      }
  try {
    const products = await Product.findAll();

    if (products.length === 0) {
      return res.json({ error: "No products found." });
    }

    return res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
