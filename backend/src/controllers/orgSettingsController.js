import asyncHandler from "../middlewares/asyncHandler.js";
import Organization from "../models/Organization.js";
import cloudinary from "cloudinary";
export const fetchOrgSettings = asyncHandler(async (req, res) => {
  const orgSettings = await Organization.findById(req.user.organizationId);

  if (!orgSettings)
    return res.status(400).json({
      success: false,
      message: "No organization found",
    });

  return res.status(200).json({
    success: true,
    message: "Organization settings fetched",
    data: orgSettings,
  });
});

export const updateOrgSettings = asyncHandler(async (req, res) => {
  let logo = null;
  if (req.files?.logo) logo = req.files.logo[0];

  try {
    const { address, maxVisitDuration, photoCapture } = req.body;
    const orgSettings = await Organization.findById(req.user.organizationId);

    if (!orgSettings) {
      if (logo?.filename) await cloudinary.uploader.destroy(logo.filename);

      return res.status(400).json({
        success: false,
        message: "No organization found",
      });
    }

    if (logo) orgSettings.logo = logo?.path;
    if (address) orgSettings.address = address;
    if (maxVisitDuration) orgSettings.maxVisitDuration = maxVisitDuration;
    if (photoCapture) orgSettings.photoCapture = photoCapture;

    await orgSettings.save();

    return res.status(200).json({
      success: true,
      message: "Organization settings updated",
      data: orgSettings,
    });
  } catch (error) {
    if (logo?.filename) await cloudinary.uploader.destroy(logo.filename);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
