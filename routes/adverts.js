const express = require("express");
const { getAdverts, getAdvertsById } = require("../controllers/adverts");
const router = express.Router();

router.get("/", getAdverts);
router.get("/:id", getAdvertsById);
// router.post("/:id", getAdvertsById);
// router.delete("/:id");
// router.patch("/:id");
module.exports = router;
