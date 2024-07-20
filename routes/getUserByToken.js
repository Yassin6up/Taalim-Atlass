const router = require("express").Router();
const decodeToken = require("../utils/decodedToken.js");

router.post("/", async (req, res) => {
  const { token } = req.body;
  console.log("----------::::: ", token)

  const user = decodeToken(token);

  if (user) {
    res.status(201).json({
      user: {
        ...user,
        token,
      },
    });
    return;
  }

  res.status(401).json({
    message: "invalide token",
    user: null
  });
});

module.exports = router;
