const express = require("express");
const router = express.Router();
const { emptyBody, validateBody } = require("../middlewares");
const {
  signUpSchema,
  signInSchema,
  profileSchema,
} = require("../schemas/authSchemas");
const { signUp, signIn, logout, refresh } = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

router.post("/signup", emptyBody(), validateBody(signUpSchema), signUp);
router.post("/signin", emptyBody(), validateBody(signInSchema), signIn);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, refresh);
router.patch(
  "/profile",
  authenticate,
  emptyBody(),
  validateBody(profileSchema)
);
router.patch("/avatar", authenticate, emptyBody());
router.delete("/", authenticate);

module.exports = router;
