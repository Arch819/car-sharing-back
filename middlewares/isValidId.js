const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { idAdvert } = req.params;
  if (!isValidObjectId(idAdvert)) {
    next(HttpError(400, `${idAdvert} is not valid id`));
  }
  next();
};

module.exports = isValidId;
