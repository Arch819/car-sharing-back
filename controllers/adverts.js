const { ctrlWrapper, HttpError } = require("../helpers");
const { Adverts } = require("../models/advert");

const getAdverts = async (req, res) => {
  const {
    limit = 12,
    page = 1,
    make,
    rentalPrice,
    mileageFrom,
    mileageTo,
  } = req.query;
  const skip = (page - 1) * limit;
  const query = {};
  if (make) {
    query.make = make;
  }
  if (rentalPrice) {
    query.rentalPrice = { $lte: rentalPrice };
  }
  if (mileageFrom) {
    query.mileage = { $gte: mileageFrom, ...query.mileage };
  }
  if (mileageTo) {
    query.mileage = { ...query.mileage, $lte: mileageTo };
  }

  const total = await Adverts.countDocuments(query);
  const totalPage = Math.ceil(total / limit);
  if (page > totalPage) {
    throw HttpError(404, "Page not found");
  }
  const advertsList = await Adverts.find(query, "", { skip, limit });
  res.json({
    totalPage,
    total,
    data: advertsList,
    page: Number(page),
    limit,
  });
};

const getAdvertsById = async (req, res) => {
  const { idAdvert } = req.params;
  const adverts = await Adverts.findById(idAdvert);
  if (!adverts) {
    throw HttpError(404, "Advert not found");
  }
  res.json(adverts);
};

const createAdvert = async (req, res) => {
  const { _id: owner } = req.user;
  const newAdvert = await Adverts.create({ ...req.body, owner });
  res.status(201).json(newAdvert);
};

const deleteAdvert = async (req, res) => {
  const { idAdvert } = req.params;
  const advert = await Adverts.findById(idAdvert);
  if (!advert) {
    throw HttpError(404, "Advert not found");
  }
  await Adverts.findByIdAndDelete(idAdvert);
  res.status(200).send();
};

const updateAdvert = async (req, res) => {
  const { idAdvert } = req.params;
  const result = await Adverts.findByIdAndUpdate(
    idAdvert,
    { ...req.body },
    { new: true }
  );
  res.json(result);
};

module.exports = {
  getAdverts: ctrlWrapper(getAdverts),
  getAdvertsById: ctrlWrapper(getAdvertsById),
  createAdvert: ctrlWrapper(createAdvert),
  deleteAdvert: ctrlWrapper(deleteAdvert),
  updateAdvert: ctrlWrapper(updateAdvert),
};