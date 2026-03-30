import asyncHandler from "../middlewares/asyncHandler.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

export const bookAppointment = asyncHandler(async (req, res) => {
  const { visitorName, hostId, date, time, purpose } = req.body;
  const organizationId = req.body.organizationId || req.user.organizationId;

  if (!visitorName || !hostId || !date || !time || !purpose || !organizationId)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  const appointment = await Appointment.create({
    visitorName,
    hostId,
    date: new Date(date),
    time,
    purpose,
    status: "pending",
    organizationId,
  });
  const host = await User.findById(hostId);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_SECRET,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: host.email,
    subject: "Confirm Appointment",
    text: `${visitorName} has  booked an appointment with you on ${date} at ${time}. Click on link below to confirm appointment`,
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  return res.status(201).json({
    message: "Appointment booked awaiting confirmation from host",
    data: appointment,
  });
});

export const fetchAppointments = asyncHandler(async (req, res) => {
  const filters = req.query;
  const query = {};
  if (filters.name)
    query.visitorName = { $regex: filters.search, $options: "i" };
  if (filters.status) query.status = filters.status;
  if (filters.host) query.hostId = filters.host;
  if (filters.date) query.createdAt = { $gte: new Date(filters.date) };

  console.log(query);
  const appointments = await Appointment.find({
    organizationId: req.user.organizationId,
    ...query,
  }).populate("hostId", "fullName email role");

  if (!appointments)
    return res
      .status(400)
      .json({ success: false, message: "No appointments found" });

  return res
    .status(200)
    .json({ message: "Appointments fetched successfully", data: appointments });
});

export const fetchAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment)
    return res.status(400).json({
      success: false,
      message: "No appointment found with this id",
    });

  return res
    .status(200)
    .json({ message: "Appointment fetched successfully", data: appointment });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment)
    return res
      .status(400)
      .json({ success: false, message: "Appointment not found" });

  appointment.status = req.query.status;
  await appointment.save();
  return res.status(200).json({
    message: `Appointment status updated to ${req.query.status}`,
    data: appointment,
  });
});

export const deleteAppointmentById = asyncHandler(async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: "Appointment deleted successfully",
  });
});
