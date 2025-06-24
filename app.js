const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "your-app-password", // không dùng mật khẩu Gmail trực tiếp!
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
    res.status(500).json({ success: false, message: "Lỗi khi gửi email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
