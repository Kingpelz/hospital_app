//auth file

const express = require("express");
const router = express.Router();
const prisma = require("../helper/prisma");
const argon = require("argon2");
const config = require("config")
const userSchema = require("../joischema/userschema");
const jwt = require("jsonwebtoken")
const appSecret = config.get("appSecret");

//create a user
router.post("/login", async (req, res, next) => {
  try {
   

    //user validation of inputs using Joi
    const valResult = userSchema.userVal.validate(req.body, {
      abortEarly: false,
    });

    if (valResult.error) {
      return res.status(400).json({
        message: valResult.error.details,
      });
    }
 const { email, password } = req.body;
//find user by email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        
      },
    });

    console.log(user);
    //if user not found
    if (!user) {
      return res.status(400).json({ message: "email and password invalid" });
    }

    //verify password
    const verifyPassword = await argon.verify(user.password, password)

    //if password is incorrect
    if (!verifyPassword) {
      return res.status(400).json({ message: "email and password incorrect" });
    }

    //generate jwt token
    const payload = {
      sub: user.id,
      email: user.email,
      
    };
const jwtOptions = { 
  expiresIn: "1day",};
    const token = jwt.sign(payload, appSecret, jwtOptions);
    //if login is successful
    return res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;