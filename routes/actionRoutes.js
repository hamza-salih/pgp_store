// actionRoutes.js

const express = require("express");
const router = express.Router();
const session = require("express-session");
const { getUserByUsername } = require("../access_db/user_queries");

function isAuthenticated(req, res, next) {
  if (req.session && req.session.correctUser) {
    return next();
  } else {
    return res.redirect("/auth/login");
  }
}

router.get("/fetch_public_key", (req, res) => {
  if (!req.session.username) {
    return res.json({ error: "User not logged in." });
  }
  const { publickey } = req.session;
  if (publickey) {
    return res.json({ publicKey: publickey });
  } else {
    return res.json({ error: "No public key." });
  }
});

router.post("/login", async (req, res) => {
  const { username, decrypted_message } = req.body;

  if (username) {
    const user = await getUserByUsername(username);
    if (user) {
      let generatedRandomMessage = req.session.randomMessage;
      if (!generatedRandomMessage) {
        generatedRandomMessage = [...Array(16)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("");
        req.session.randomMessage = generatedRandomMessage;
      }
      req.session.publickey = user.PGPKey;
      req.session.userID = user.userID;
      req.session.username = username;
      req.session.encrypted = true;
      req.session.displayName = user.displayName;
      req.session.pin = user.pin;
      req.session.utype = user.utype;
      req.session.Email = user.Email;
      req.session.Address = user.Address;
      res.redirect("/decrypt");
    } else {
      res.status(404).send("User not found.");
    }
  } else if (decrypted_message) {
    const original_message = req.session.randomMessage;
    if (decrypted_message.trim() === original_message.trim()) {
      const user = await getUserByUsername(req.session.username);
      req.session.correctUser = true;
      res.redirect("/home");
    } else {
      return res.redirect("/decrypt");
    }
  } else {
    res.status(400).send("Invalid request.");
  }
});

module.exports = router;
