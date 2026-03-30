import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    idNumber: {
      type: String,
    },
    idType: {
      type: String,
      enum: ["Ghana Card", "Passport", "Driver\'s Lisence", "Student ID"],
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    purposeOfVisit: {
      type: String,
    },
    photo: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["inside", "checked-out", "overdue"],
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    // appointmentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Appointment",
    // },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true },
);

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
