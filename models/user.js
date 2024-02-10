const { Schema, model } = require("mongoose");
const { handleMongooseError, emailRegexp } = require("../helpers");

const rolList = ["user", "admin"];

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, unique: true, required: true },
    password: { type: String, required: true },
    token: String,
    avatar: { type: String, default: "" },
    role: { type: String, enum: rolList, default: "user" },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = { User };
