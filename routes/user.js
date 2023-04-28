const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const userController = require("../controller/user");

//TODO Check all return codes
//TODO Change expire time on token

router.post("/signup", userController.addUser);
router.post("/login", userController.loginUser);
router.get("/validatetoken", auth, userController.validateToken);

module.exports = router;
