import asyncHandler from "../middlewares/asyncHandler.js";
import ActivityLog from "../models/ActivityLog.js";

export const fetchLogs = asyncHandler(async (req, res) => {
  const { limit = 20, page = 1 } = req.query;

  const logs = await ActivityLog.find({ organizationId: req.user.organizationId })
    .populate("userId", "fullName email role")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await ActivityLog.countDocuments({ organizationId: req.user.organizationId });

  res.status(200).json({
    success: true,
    message: "Logs fetched successfully",
    data: logs,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  });
});
