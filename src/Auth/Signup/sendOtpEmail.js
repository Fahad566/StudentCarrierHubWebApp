import emailjs from "emailjs-com"; // Install EmailJS for client-side email sending

const sendOtpEmail = async (recipientEmail, otp) => {
  try {
    const templateParams = {
      to_email: recipientEmail,
      otp: otp,
    };

    await emailjs.send(
      "service_hk9n4fh", // Replace with your EmailJS service ID
      "template_6x9s01a", // Replace with your EmailJS template ID
      templateParams,
      "iC2xMIi8s1n79MzdT" // Replace with your EmailJS user ID
    );
    console.log("OTP email sent to:", recipientEmail);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export default sendOtpEmail;


