import dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";
import multer from "multer";

import path from "path";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET  as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET  as string;

// 🔑 Access Token (short life)
export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn:  "15m",});
};


export const decodedAccessToken = (token: string) => {
  const decoded = jwt.verify( token, ACCESS_SECRET);
  return decoded;
};

// 🔄 Refresh Token (long life)
export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d",});
};


export const decodedRefreshToken = (token: string) => {
  const decoded = jwt.verify( token, REFRESH_SECRET);
  return decoded;
};




// Profile Upload
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});

// Account Upload
const accountStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/account/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `account-${Date.now()}${ext}`);
  },
});

// Receipt Upload****
const receiptStorage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, "public/receipt/");
  },
  filename:(req, file, cb)=>{
    const ext = path.extname(file.originalname);
    cb(null, `receipt-${Date.now()}${ext}`);
  }
})


// Image Validation
const fileFilter: multer.Options["fileFilter"] = ( req, file, cb ) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG, PNG, WEBP files are allowed"));
};

// Profile Upload Middleware
export const upload = multer({
  storage: profileStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Account Upload Middleware
export const uploadAcc = multer({
  storage: accountStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


// Receipt Upload Middleware
export const uploadReceipt = multer({
  storage:receiptStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
