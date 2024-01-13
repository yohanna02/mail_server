const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sendMail = require("./sendMail.js");

const app = express();

app.use(cors());

app.get("/send-mail", async (req, res) => {
  try {
    const otp = req.query.otp;
    const to = req.query.to;

    if (!otp || !to) {
      return res.status(400).send("OTP and to is required");
    }

    const message_body = `<h1>OTP Code</h1><p>Your OTP code is: ${otp}</p>`;
    await sendMail(to, "OTP Code", message_body);

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Mail server running on port ${process.env.PORT}`)
);
