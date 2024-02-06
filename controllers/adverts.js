const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Adverts } = require("../models/advert");

const getAdverts = async (req, res) => {
  const { limit = 12, page = 1, make, rentalPrice, mileage } = req.query;
  const skip = (page - 1) * limit;
  const query = {};
  if (make) {
    query.make = make;
  }
  if (rentalPrice) {
    query.rentalPrice = rentalPrice;
  }
  if (mileage) {
    query.mileage = mileage;
  }
  const advertsList = await Adverts.find(query, "", { skip, limit });
  res.json({
    totalPage: Math.ceil(advertsList.length / limit) ?? null,
    total: advertsList.length,
    data: advertsList,
    page: Number(page),
  });
};

const getAdvertsById = async (req, res) => {
  const { id } = req.params;
  const adverts = await Adverts.findById(id);
  res.json({ adverts });
};

module.exports = {
  getAdverts: ctrlWrapper(getAdverts),
  getAdvertsById: ctrlWrapper(getAdvertsById),
};
