const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/bookstore", require("./routes/bookStoreRoutes"));

// Gmail SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tc623933@gmail.com",
    pass: "oqbx uacy crhs piqt",
  },
});

// Endpoint
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "tc623933@gmail.com",
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      console.log(`✅ Email sent to ${email}`);
      res.json({ success: true });
      return res.status(500).json({ error: "Failed to send email." });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ success: true });
  });
});

let otpStore = {};

app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: `  <${email}>`,
    to: "tc623933@gmail.com",
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, error: "Invalid OTP" });
});
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// app.use("/api/home", require("./routes/homeRoutes"));
// app.use("/api/book", require("./routes/bookRoutes"));
// app.use("/api/category", require("./routes/categoryRoutes"));

// const transporter = nodemailer.createTransport({
// service: "gmail",
// auth: {
//     user: process.env.EMAIL_USER, // your_email@gmail.com
//     pass: process.env.EMAIL_PASS, // Gmail App Password
// },
// });

// // Gmail SMTP transport

// // Endpoint
// app.post("/send-email", (req, res) => {
// const { name, email, message } = req.body;

// const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: "tc623933@gmail.com",
//     subject: `New Contact Form Message from ${name}`,
//     html: `
//     <h3>Contact Details</h3>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Message:</strong> ${message}</p>
//     `,
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//     console.error("Email error:", error);
//     return res.status(500).json({ error: "Failed to send email." });
//     }
//     console.log("Email sent:", info.response);
//     res.status(200).json({ success: true });
// });
// });

// // Temporary in-memory store (use DB or Redis in production)
// const otpStore = {};

// // Generate 6-digit OTP
// const generateOTP = () =>
// Math.floor(100000 + Math.random() * 900000).toString();

// // Send OTP
// app.post("/send-otp", async (req, res) => {
// const { email } = req.body;
// const otp = generateOTP();
// otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry

// try {
//     await transporter.sendMail({
//     from: `"My App" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your OTP Code",
//     html: `<h3>Your OTP: ${otp}</h3><p>It is valid for 5 minutes.</p>`,
//     });
//     res.status(200).json({ message: "OTP sent" });
// } catch (err) {
//     res.status(500).json({ message: "Failed to send OTP", error: err });
// }
// });

// // Verify OTP
// app.post("/verify-otp", (req, res) => {
// const { email, otp } = req.body;
// const stored = otpStore[email];

// if (!stored) return res.status(400).json({ message: "No OTP sent" });

// if (stored.otp === otp && Date.now() < stored.expires) {
//     delete otpStore[email]; // OTP used
//     return res.status(200).json({ message: "OTP verified" });
// }

// return res.status(400).json({ message: "Invalid or expired OTP" });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//     const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Load routes
// app.use("/api/home", require("./routes/homeRoutes"));
// app.use("/api/book", require("./routes/bookRoutes"));
// app.use("/api/category", require("./routes/categoryRoutes"));

// // ======================
// // 📧 Email Transporter
// // ======================
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // your Gmail address
//     pass: process.env.EMAIL_PASS, // App Password
//   },
// });

// // ======================
// // 📬 Contact Form Endpoint
// // ======================
// app.post("/send-email", (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: "tc623933@gmail.com", // your receiving email
//     subject: `New Contact Form Message from ${name}`,
//     html: `
//       <h3>Contact Details</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Message:</strong> ${message}</p>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Email error:", error);
//       return res.status(500).json({ error: "Failed to send email." });
//     }
//     console.log("Email sent:", info.response);
//     res.status(200).json({ success: true });
//   });
// });

// // ======================
// // 🔐 OTP Store (in-memory)
// // ======================
// const otpStore = {}; // Use Redis or DB for production

// // Generate 6-digit OTP
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // ======================
// // 📤 Send OTP Endpoint
// // ======================
// app.post("/send-otp", async (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ message: "Email is required" });

//   const otp = generateOTP();
//   otpStore[email] = {
//     otp,
//     expires: Date.now() + 5 * 60 * 1000, // 5 mins
//   };

//   try {
//     await transporter.sendMail({
//       from: `"My App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       html: `<h3>Your OTP: <b>${otp}</b></h3><p>It is valid for 5 minutes.</p>`,
//     });

//     res.status(200).json({ message: "OTP sent" });
//   } catch (err) {
//     console.error("OTP email error:", err);
//     res.status(500).json({ message: "Failed to send OTP", error: err });
//   }
// });

// // ======================
// // ✅ Verify OTP Endpoint
// // ======================
// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;
//   const stored = otpStore[email];

//   if (!stored) {
//     return res.status(400).json({ message: "No OTP found. Please request a new one." });
//   }

//   if (stored.otp === otp && Date.now() < stored.expires) {
//     delete otpStore[email]; // OTP used
//     return res.status(200).json({ message: "OTP verified" });
//   }

//   return res.status(400).json({ message: "Invalid or expired OTP" });
// });

// // ======================
// // 🚀 Start Server
// // ======================
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
