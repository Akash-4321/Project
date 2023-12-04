let express = require("express");
let router = express.Router();

let auth = require("../middlewares/auth");

let UserAccountController = require("../controllers/useraccount");

router.get("/", (req, res, next) => res.status(200).json({ success: true }));
router.post("/register", UserAccountController.createUser);
router.post("/login", UserAccountController.loginAccount);

router.get("/getusers", auth.apiKeyAuth, UserAccountController.fetchusers);

module.exports = router;