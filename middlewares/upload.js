const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { nanoid } = require("nanoid");
const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder;
    let public;
    if (file.fieldname === "avatar") {
      folder = "avatars";
      public = req.user.id;
    }
    if (file.fieldname === "advert") {
      folder = "adverts";
      public = nanoid();
    } else {
      folder = "misc";
    }

    return {
      folder,
      allowed_formats: ["jpg", "png"],
      public_id: public,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});
const upload = multer({
  storage,
});

module.exports = upload;
