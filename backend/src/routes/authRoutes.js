import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { cloudinaryUpload } from "../config/multer.js";

const router = express.Router();

const uploadLogo = (req, res, next) => {
  cloudinaryUpload({
    folder: "logos",
    allowedFormats: ["jpg", "jpeg", "png", "webp"],
  }).single("logo")(req, res, (err) => {
    if (err) {
      console.log(err);
      if (err.errno == -3008)
        return res.status(400).json({
          message: "Network Error. Please check your internet connection",
        });

      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post("/register", uploadLogo, register);
router.post("/login", login);
router.post("/logout", logout);

// TODO: Implement these endpoints
// router.post("/forgot-password", forgotPassword);
// router.post("/google-login", googleLogin);
// router.post("/microsoft-login", microsoftLogin);
// router.post("/verify-mfa", verifyMfa);

export default router;
