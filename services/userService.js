import bcrypt from "bcryptjs";
// const bcrypt = bcryptjs.default; // Fixes the issue
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../dao/userDao.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(200).json({ message: "User already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, hashedPassword);

    return res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user?.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};
