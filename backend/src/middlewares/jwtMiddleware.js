import jwt from "jsonwebtoken";

export const generateToken = (data, time = "1h") => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
  return token;
};
