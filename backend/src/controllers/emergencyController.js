import asyncHandler from "../middlewares/asyncHandler.js";
import Appointment from "../models/Appointment.js";
import Emergency from "../models/Emergency.js";
import Visitor from "../models/Visitor.js";

export const activateEmergency = asyncHandler(async (req, res) => {
  const { _id, organizationId } = req.user;

  const activeEmergency = await Emergency.findOne({
    $and: [{ organizationId }, { isActive: true }],
  });

  if (activeEmergency)
    return res.status(400).json({
      success: false,
      message: "Emergency has already been activated",
    });
  const emergency = await Emergency.create({
    organizationId,
    activatedAt: new Date(),
    activatedBy: _id,
    isActive: true,
  });

  return res.status(200).json({
    success: true,
    message: "Emergency activated",
    data: emergency,
  });
});

export const deactivateEmergency = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  const emergency = await Emergency.findOne({
    $and: [{ organizationId }, { isActive: true }],
  });

  if (!emergency)
    return res
      .status(400)
      .json({ success: false, message: "No active emergency" });
  emergency.deactivatedAt = new Date();
  emergency.isActive = false;
  await emergency.save();

  return res.status(200).json({
    success: true,
    message: "Emergency deactivated",
  });
});

export const currentEmergency = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;

  const emergency = await Emergency.findOne({
    $and: [{ organizationId }, { isActive: true }],
  });

  if (!emergency)
    return res
      .status(400)
      .json({ success: false, message: "No active emergency" });

  const visitors = await Visitor.find({
    $and: [{ organizationId }, { status: "inside" }],
  });
  const appointments = await Appointment.find({
    $and: [{ organizationId }, { status: "arrived" }],
  });

  return res.status(200).json({
    success: true,
    message: "Visitors present during emergency",
    data: {
      visitors,
      appointments,
    },
  });
});
