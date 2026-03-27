import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env.js";

export function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
