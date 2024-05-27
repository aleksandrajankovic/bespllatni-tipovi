import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModal from "../models/user.js";

const secret = process.env.JWT_SECRET; // token

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d6f04e9a8b65e0",
    pass: "73ffbec161d0df",
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
      status: "unverified", // Dodato polje za status naloga
      verificationToken, // Dodato polje za token za verifikaciju
    });

    const verificationLink = `https://besplatni-tipovi.vercel.app/verify/${verificationToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Potvrdite svoj nalog",
      html: `Kliknite na <a href="${verificationLink}">ovaj link</a> da biste verifikovali svoj nalog.`,
    });

    console.log("Signup success. Verification email sent.");
    res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
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
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error while updating user status" });
  }
};

/*LOGIN*/
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // Check if the user is verified
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
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
