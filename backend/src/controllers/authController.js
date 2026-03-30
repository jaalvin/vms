import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Organization from "../models/Organization.js";
import User from "../models/User.js";
import { generateToken } from "../middlewares/jwtMiddleware.js";
import cloudinary from "../config/cloudinary.js";

// REGISTER
export const register = async (req, res) => {
  let org = null;
  const logo = req.file ?? null;

  try {
    const payload =
      typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;
    const { organization, fullName, email, phone, password } = payload;
    const { name, address, type, orgPhone, maxVisitDuration, photoCapture } = organization;

    if (!name || !fullName || !email || !password) {
      if (logo?.filename) await cloudinary.uploader.destroy(logo.filename);

      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // create organization
    org = await Organization.create({
      name,
      type,
      email: organization.email,
      phone,
      address,
      logo: logo?.path,
      maxVisitDuration: maxVisitDuration || 2,
      photoCapture: photoCapture !== undefined ? photoCapture : true,
    });

    //check for user with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (org) await Organization.findByIdAndDelete(org._id);
      if (logo?.filename) await cloudinary.uploader.destroy(logo.filename);

      return res.status(400).json({
        success: false,
        message: "Email has been taken by another user",
      });
    }

    // get initials
    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create admin user
    const user = await User.create({
      fullName,
      initials,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      organizationId: org._id,
    });

    return res.json({
      success: true,
      message: "Organization and admin created",
      data: {
        organizationId: org._id,
        adminId: user._id,
      },
    });
  } catch (err) {
    if (org) await Organization.findByIdAndDelete(org._id);
    if (logo?.filename) await cloudinary.uploader.destroy(logo.filename);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // token
    const token = generateToken(user._id, "1d");

    return res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        success: true,
        token,
        role: user.role,
        user: {
          id: user._id,
          fullName: user.fullName,
          initials: user.initials,
          email: user.email,
          organizationId: user.organizationId,
          isActive: user.isActive,
        },
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("authToken", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 0,
      })
      .json({ message: "User logout successful", data: null });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
