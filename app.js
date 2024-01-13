const express = require("express");
require("dotenv").config();

const sendMail = require("./sendMail.js");

const app = express();

app.get("/send-mail", async (req, res) => {
    const otp = req.query.otp;
    const to = req.query.to;

    if (!otp) {
        return res.status(400).send("OTP is required");
    }

    const message_body = `<h1>OTP Code</h1><p>Your OTP code is: ${otp}</p>`;
    await sendMail(to, "OTP Code", message_body);

    res.end();
});

app.listen(process.env.PORT, () => console.log(`Mail server running on port ${process.env.PORT}`))