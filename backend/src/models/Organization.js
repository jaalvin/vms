import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    logo: {
      type: String,
    },

    maxVisitDuration: {
      type: Number,
    },

    photoCapture: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
