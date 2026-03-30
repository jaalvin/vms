import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import OTP from "otp-generator";
import bcrypt from "bcryptjs";
import sendMail from "../utils/mail.js";

export const fetchUsers = asyncHandler(async (req, res) => {
  const filters = req.query;
  let query = {};
  if (filters.search)
    query.fullName = { $regex: filters.search, $options: "i" };
  if (filters.role) query.role = filters.role;

  const users = await User.find({
    organizationId: req.user.organizationId,
    ...query,
  });

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

export const fetchUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(400).json({ success: false, message: "User not found" });

  return res
    .status(200)
    .json({ success: true, message: "User fetched successfully", data: user });
});

export const addUser = asyncHandler(async (req, res) => {
  const { fullName, email, role, organizationId } = req.body;

  if (!fullName || !email || !organizationId || !role)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  const existinigUser = await User.findOne({ email });

  if (existinigUser)
    return res
      .status(400)
      .json({ success: false, message: "User exists with this" });

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const generatedPassword = OTP.generate(8, {
    digits: true,
    upperCaseAlphabets: true,
    lowerCaseAlphabets: true,
    specialChars: false,
  });
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(generatedPassword, salt);

  const user = await User.create({
    fullName,
    initials,
    email,
    password: hashedPassword,
    role,
    organizationId,
    isActive: true,
  });

  const { password, ...userData } = user._doc;
  sendMail(
    email,
    "Account Created",
    `Your login credentials are; email: ${email} and password: ${generatedPassword}`,
  );

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    data: { ...userData },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully" });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, role, isActive } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (fullName && fullName !== user.fullName) {
    user.initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    user.fullName = fullName;
  }

  if (email) user.email = email;
  if (role) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  const { password, ...userData } = user._doc;

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: userData,
  });
});
