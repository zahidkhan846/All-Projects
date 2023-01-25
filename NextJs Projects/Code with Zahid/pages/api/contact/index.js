import sgMail from "@sendgrid/mail";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    const errors = {};
    if (name.trim() === "" || name.length < 3)
      errors.name = "Name must not be empty and atleast have 3 characters.";

    if (email.trim() === "" || !email.includes("@"))
      errors.email = "Email must not be empty and should be a valid email.";

    if (message.trim() === "" || message.length < 10)
      errors.message =
        "Message must not be empty and atleast have 10 characters.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const newMessage = {
      email: email,
      name: name,
      message: message,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "zahid.khankz846@gmail.com",
      from: email,
      subject: `${message.substr(0, 10)} by ${name}`,
      name,
      text: message,
    };
    try {
      await sgMail.send(msg);
      console.log("Email sent");
      return res.status(200).json({ messgae: "Successfully Sent!" });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ errors: { message: "Something went wrong!" } });
    }
  }
};
