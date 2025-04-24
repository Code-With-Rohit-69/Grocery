import nodemailer from "nodemailer";

export const contact = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter your email" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log({ email });

    await transporter.sendMail({
      from: `"New Subscriber" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "New User",
      text: "I am Your new Customer",
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
