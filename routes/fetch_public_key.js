const express = require("express");
const router = express.Router();
const openpgp = require("openpgp");

router.get("/", async (req, res) => {
  if (!req.session.username) {
    return res.json({ error: "User not logged in." });
  }
  const { displayName, username, publickey, utype } = req.session;
  let { randomMessage } = req.session;

  if (publickey && !/-----BEGIN PGP PUBLIC KEY BLOCK-----/.test(publickey)) {
    return res.json({ error: "Error reading the public key!" });
  }

  if (publickey) {
    const publicKey = await openpgp.readKey({ armoredKey: publickey });
    const encryptedRandomMessage = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: randomMessage }),
      encryptionKeys: publicKey,
    });

    return res.json({
      displayName,
      username,
      publickey,
      utype,
      encryptedRandomMessage
    });
  } else {
    return res.json({ error: "No public key." });
  }
});

module.exports = router;
