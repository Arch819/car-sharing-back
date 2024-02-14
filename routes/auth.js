const express = require("express");
const router = express.Router();
const { emptyBody, validateBody } = require("../middlewares");
const {
  signUpSchema,
  signInSchema,
  profileSchema,
} = require("../schemas/authSchemas");
const {
  signUp,
  signIn,
  logout,
  refresh,
  updateAvatar,
  updateProfile,
} = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

router.post("/signup", emptyBody(), validateBody(signUpSchema), signUp);
router.post("/signin", emptyBody(), validateBody(signInSchema), signIn);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, refresh);
router.patch(
  "/profile",
  authenticate,
  emptyBody(),
  validateBody(profileSchema),
  updateProfile
);
router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar);
router.delete("/", authenticate);

module.exports = router;
