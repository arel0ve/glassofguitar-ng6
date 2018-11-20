const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

const User = require('../models/user').User;

/* POST registration with mail verifying. */
router.post('/', registr);

async function registr(req, res, next) {

  try {
    let user = await User.findOne({ login: req.body.login });

    if (user) {
      res.status(400).send(`Login '${req.body.login}' is already used.`);
      return;
    }

    user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).send(`Email '${req.body.email}' is already used.`);
      return;
    }

    let verifyCode = Math.floor(Math.random() * (Math.pow(2, 16) - 1)).toString(16);

    let newUser = new User({
      login: req.body.login,
      isVerify: true,
      verifyCode: verifyCode,
      email: req.body.email,
      password: req.body.password,
      tag: req.body.tag,
      name: req.body.name,
      birthday: req.body.birthday,
      place: req.body.place,
      country: req.body.country,
      hatColor: req.body.hatColor,
      songs: []
    });

    await newUser.save();

    req.session.user = null;
    res.status(200).send(newUser.login);


  } catch(e) {
    console.log(e);
    res.status(500).send("Server Error!");
  }

      // const output = `<h3>Dear ${req.body.name}!</h3>
      //   <p>Congratulation with registration on Glassof-Guitar!</p>
      //   <p>Your data:</p>
      //   <ul>
      //     <li>email: ${req.body.email}</li>
      //     <li>login: ${req.body.login}</li>
      //     <li>password: ${req.body.password}</li>
      //     <li>full name: ${req.body.name}</li>
      //   </ul>
      //   <p>For continue, please, verify your account on Glassof-Guitar with code
      //   <code style="font-size: 1.5em"><b>${verifyCode}</b></code></p>
      //   <p>If you didn't registration and someone used this email - just ignore this letter, that's ok.
      //   Or join to us on glassof-guitar.com it will be fun.</p>`;
      //
      // let smtpTransport;
      //
      // try {
      //   smtpTransport = nodemailer.createTransport({
      //     host: 'smtp.gmail.com',
      //     port: 465,
      //     secure: true, // true for 465, false for other ports 587
      //     auth: {
      //       user: "glassof.guitar@gmail.com",
      //       pass: "e4e5-Nf3Nf6"
      //     }
      //   });
      // } catch (e) {
      //   res.statusCode = 500;
      //   res.send(Error! We can't send confirmation letter to your email. Please, try again later.);
      //   return console.log('Error: ' + e.name + ":" + e.message);
      // }
      //
      // let mailOptions = {
      //   from: 'glassof.guitar@gmail.com',
      //   to: req.body.email,
      //   subject: 'Verifying on Glassof-Guitar',
      //   text: `Verifying code on Glassof-Guitar: ${verifyCode}`,
      //   html: output
      // };
      //
      // smtpTransport.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     res.statusCode = 500;
      //     res.send(`Error! Error in sending letter to ${req.body.email}. Please, press 'Create' again.`);
      //
      //     return console.log(`Error in sending letter to ${req.body.email}`);
      //   }
      //
      //   console.log('Message sent: %s', info.messageId);
      //
      //   let user = new User({
      //     login: req.body.login,
      //     isVerify: false,
      //     verifyCode: verifyCode,
      //     email: req.body.email,
      //     password: req.body.password,
      //     tag: req.body.tag,
      //     name: req.body.name,
      //     birthday: req.body.birthday,
      //     place: req.body.place,
      //     country: req.body.country,
      //     hatColor: req.body.hatColor
      //   });
      //
      //   user.save()
      //       .then(() => {
      //         req.session.user = null;
      //         res.statusCode = 200;
      //         res.send("Input verify code from your email");
      //       })
      //       .catch(() => {
      //         res.statusCode = 501;
      //         res.send("Error! Error in saving to database. Please, press 'Create' again.");
      //       });
      // });

}

module.exports = router;
