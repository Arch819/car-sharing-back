const express = require("express");
const router = express.Router();
const {
  getAdverts,
  getAdvertsById,
  createAdvert,
  deleteAdvert,
  updateAdvert,
} = require("../controllers/adverts");
const { emptyBody, validateBody, isValidId } = require("../middlewares/");
const { createAdvertSchema } = require("../schemas/advertsSchemas");

router.get("/", getAdverts);
router.get("/:idAdvert", isValidId, getAdvertsById);
router.post("/", emptyBody(), validateBody(createAdvertSchema), createAdvert);
router.delete("/:idAdvert", isValidId, deleteAdvert);
router.patch("/:idAdvert", emptyBody(), isValidId, updateAdvert);

module.exports = router;
