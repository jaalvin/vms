import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    activatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activatedAt: {
      type: Date,
      required: true,
    },
    deactivatedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

const Emergency = mongoose.model("Emergency", emergencySchema);

export default Emergency;
