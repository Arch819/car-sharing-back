const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const { log } = require("console");

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const useEmail = await User.findOne({ email });
  if (useEmail) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword, name });
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    profile: {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      role: newUser.role,
      createdAdverts: [],
      favorites: [],
      createdAt: newUser.createdAt,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
  await User.findByIdAndUpdate(user._id, { token: newToken });

  res.json({
    token: newToken,
    profile: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAdverts: user.createdAdverts,
      favorites: user.favorites,
      createdAt: user.createdAt,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const refresh = async (req, res) => {
  const {
    token,
    name,
    email,
    avatar,
    role,
    createdAdverts,
    favorites,
    createdAt,
  } = req.user;
  console.log("refresh");
  res.json({
    token,
    profile: {
      name,
      email,
      avatar,
      role,
      createdAdverts,
      favorites,
      createdAt,
    },
  });
};

const updateProfile = async (req, res) => {
  const { _id } = res.user;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { ...req.bode },
    { new: true }
  );
  res.json({
    name: updateUser.name,
    email: updateUser.email,
    avatar: updateUser.avatar,
    role: updateUser.role,
    createdAdverts: updateUser.createdAdverts,
    favorites: updateUser.favorites,
    createdAt: updateUser.createdAt,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  try {
    await fs.stat(avatarsDir);
  } catch (err) {
    await fs.mkdir(avatarsDir, { recursive: true });
  }
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join("avatars", filename);
  const result = await User.findByIdAndUpdate(_id, { avatar }, { new: true });
  if (!result) {
    throw HttpError(400, "Bad request");
  }
  res.json({ avatar: avatar });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
  updateProfile: ctrlWrapper(updateProfile),
  updateAvatar: ctrlWrapper(updateAvatar),
};
