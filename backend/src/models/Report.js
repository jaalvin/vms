import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  dateRange: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  data: {
    type: String,
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  generatedAt: {
    type: Date,
    required: true,
  },
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
