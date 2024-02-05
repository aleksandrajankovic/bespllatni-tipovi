import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "sasndladhflflgbmsbdkdsjfkjjdbkfjbs";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token) {
      if (isCustomAuth) {
        decodedData = jwt.verify(token, secret, { ignoreExpiration: true });
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.verify(token, secret, { ignoreExpiration: false });
        const googleId = decodedData?.sub.toString();
        const user = await UserModel.findOne({ googleId });

        if (!user) {
          throw new Error("User not found");
        }

        req.userId = user._id;
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Session expired" });
  }
};

export default auth;
