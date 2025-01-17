import nodemailer from "nodemailer";

export const sendDemoEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service provider
    auth: {
        user: "muhammadahmadishfaq5470@gmail.com", // Your email address
        pass: "xgdtyvrxpowhumoa",    // Your email password or app password
      },
  });

  const mailOptions = {
    from: "muhammadahmadishfaq5470@gmail.com",
    to: email, // Client's email
    subject: "Demo Booking Confirmation",
    text: `Hi ${name},\n\nThank you for booking a demo. We will contact you soon.\n\nBest regards,\nYour Team`,
  };

  await transporter.sendMail(mailOptions);
};
