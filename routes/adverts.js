const express = require("express");
const router = express.Router();
const {
  getAdverts,
  getAdvertsById,
  createAdvert,
  deleteAdvert,
  updateAdvert,
  addImageAdvert,
} = require("../controllers/adverts");
const { emptyBody, validateBody, isValidId } = require("../middlewares/");
const { createAdvertSchema } = require("../schemas/advertsSchemas");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

router.get("/", getAdverts);
router.get("/:idAdvert", isValidId, getAdvertsById);
router.post(
  "/",
  authenticate,
  emptyBody(),
  validateBody(createAdvertSchema),
  createAdvert
);
router.patch("/:idAdvert", upload.single("advert"), addImageAdvert);
router.delete("/:idAdvert", isValidId, deleteAdvert);
router.patch("/:idAdvert", emptyBody(), isValidId, updateAdvert);

module.exports = router;
