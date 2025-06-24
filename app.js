require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu thông tin." });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: "youremail@gmail.com",
      subject: `Liên hệ từ ${name}`,
      text: message,
    });

    res
      .status(200)
      .json({ success: true, message: "Đã gửi liên hệ thành công." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi khi gửi email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
