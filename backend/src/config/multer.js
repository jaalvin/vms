// config/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

/**
 * CLOUDINARY UPLOAD
 * @param {Object} options
 * @param {String} options.folder - cloudinary folder
 * @param {Array} options.allowedFormats - allowed file types
 */
export const cloudinaryUpload = ({
  folder = "uploads",
  allowedFormats = ["jpg", "jpeg", "png", "webp"],
} = {}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder,
      allowed_formats: allowedFormats,
      public_id: `${Date.now()}-${file.originalname}`,
    }),
  });

  return multer({ storage });
};

/* MEMORY STORAGE (for excel, processing files etc.) */
export const memoryUpload = multer({
  storage: multer.memoryStorage(),
});
