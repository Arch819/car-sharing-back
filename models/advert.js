const { Schema, model } = require("mongoose");
const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const rentalConditionsSchema = new Schema({
  MinimumAge: { type: Number, required: true },
  driverLicense: { type: Boolean, required: true },
  otherRequirements: String,
});

const advertSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, required: true },
    year: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    fuelConsumption: { type: String, required: true },
    engineSize: { type: String, required: true },
    accessories: Array,
    functionalities: Array,
    rentalPrice: { type: Number, required: true },
    rentalCompany: { type: String, required: true },
    address: { type: addressSchema, required: true },
    rentalConditions: { type: rentalConditionsSchema, required: true },
    mileage: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Adverts = model("advert", advertSchema);

module.exports = { Adverts };
