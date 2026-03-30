import asyncHandler from "../middlewares/asyncHandler.js";
import Visitor from "../models/Visitor.js";
import cloudinary from "../config/cloudinary.js";

export const addVisitor = asyncHandler(async (req, res) => {
  const photo = req.file ?? null;

  try {
    const {
      fullName,
      phone,
      email,
      idNumber,
      idType,
      hostId,
      purposeOfVisit,
    } = req.body;
    const organizationId = req.body.organizationId || req.user.organizationId;

    if (!fullName || !phone || !hostId || !organizationId) {
      if (photo) await cloudinary.uploader.destroy(photo?.filename);
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const visitor = await Visitor.create({
      fullName,
      phone,
      email,
      idNumber,
      idType,
      hostId,
      purposeOfVisit,
      organizationId,
      photo: {
        url: photo?.path,
        public_id: photo?.filename,
      },
      status: "inside",
      checkInTime: new Date(),
    });
    return res
      .status(201)
      .json({ message: "Visitor Checked In Successfully", data: visitor });
  } catch (error) {
    if (photo) await cloudinary.uploader.destroy(photo?.filename);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

export const fetchVisitors = asyncHandler(async (req, res) => {
  const filters = req.query;
  const query = {};
  if (filters.search)
    query.fullName = { $regex: filters.search, $options: "i" };
  if (filters.status) query.status = filters.status;
  if (filters.host) query.hostId = filters.host;
  if (filters.date) query.createdAt = { $gte: new Date(filters.date) };

  const visitors = await Visitor.find({
    organizationId: req.user.organizationId,
    ...query,
  }).populate("hostId", "fullName email role");

  if (!visitors)
    return res
      .status(400)
      .json({ success: false, message: "No visitors found" });

  return res
    .status(200)
    .json({ message: "Visitors fetched successfully", data: visitors });
});

export const fetchVisitorById = asyncHandler(async (req, res) => {
  const visitor = await Visitor.findById(req.params.id);

  if (!visitor)
    return res
      .status(400)
      .json({ success: false, message: "No visitor found with this id" });

  return res
    .status(200)
    .json({ message: "Visitor fetched successfully by id", data: visitor });
});

export const checkOutVisitor = asyncHandler(async (req, res) => {
  const visitor = await Visitor.findOne({
    $and: [{ _id: req.params.id }, { status: "inside" }],
  });

  if (!visitor)
    return res.status(400).json({
      success: false,
      message: "No visitor found with this id checked in",
    });

  visitor.checkOutTime = new Date();
  visitor.status = "checked-out";
  await visitor.save();
  return res
    .status(200)
    .json({ message: "Visitor checked out successfully", data: visitor });
});

export const deleteVisitor = asyncHandler(async (req, res) => {
  await Visitor.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Visitor deleted successfully" });
});
