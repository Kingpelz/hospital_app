const express = require("express");
const router = express.Router();
const prisma = require("../helper/prisma");
const argon = require("argon2");
const userSchema = require("../joischema/userschema");
const authAdmin = require("../middleware/authAdmin");
const authProtect = require("../middleware/auth");

//create a user
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const valResult = userSchema.userVal.validate(req.body, {
      abortEarly: false,
    });
    if (valResult.error) {
      return res.status(400).json({ message: valResult.error.details });
    }
    const pwdResult = userSchema.pwdVal.validate(req.body.password);
    if (pwdResult.error) {
      return res.status(400).json({ message: pwdResult.error.details });
    }

    const hashedPassword = await argon.hash(password);

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    // create a new user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "user not registered" });
    }

    // create a profile for the new user
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });
    if (!profile) {
      return res.status(400).json({ message: "profile not created" });
    }

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/all", authProtect, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        id: true,
        profile: true,
        surgery: true,
      },
    });
    if (!users) {
      return res.status(400).json({ message: "no user found" });
    }
    return res.status(200).json({ message: "users found", users });
  } catch (error) {
    next(error);
  }
});

router.get("/single/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        email: true,
        id: true,
        profile: true,
        surgery: true,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user found", user });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/delete/:id",
  [authProtect, authAdmin],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      if (!user) {
        return res.status(400).json({ error: "user not deleted" });
      }
      return res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: email,
        password: password,
      },
    });
    if (!updatedUser) {
      return res.status(400).json({ message: "user not updated" });
    }
    return res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
