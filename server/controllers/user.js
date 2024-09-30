import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModal from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET; // token

//SendGrid 
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

const generateVerificationToken = () => {
  const verificationToken = jwt.sign({}, secret, { expiresIn: "1h" });
  return verificationToken;
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verificationToken = generateVerificationToken();

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      role: "user",
      status: "unverified",
      verificationToken,
    });

    const verificationLink = `https://besplatni-tipovi.vercel.app/verify/${verificationToken}`;

    const mailOptions = {
      from: "aleksandra.bgd.87@gmail.com",
      to: email,
      subject: "Potvrdite svoj nalog",
      html: `Kliknite na <a href="${verificationLink}">ovaj link</a> da biste verifikovali svoj nalog.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error);
        return res.status(500).json({ message: "Failed to send verification email" });
      } else {
        console.log("Signup success. Verification email sent:", info.response);
        return res.status(201).json({ result });
      }
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const verifyAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await UserModal.findOne({ verificationToken: token });

    if (user) {
      user.status = "verified";
      await user.save();
      return res.status(200).json({ message: "Account verified successfully" });
    } else {
      return res.status(404).json({ message: "Invalid verification token" });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).json({ message: "Error while updating user status", error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    if (oldUser.status !== "verified") {
      return res.status(403).json({ message: "User is not verified" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });
    console.log("Signin success. Token:", token);
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
