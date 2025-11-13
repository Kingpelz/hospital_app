const express = require("express");
const router = express.Router();
const prisma = require("../helper/prisma");
const authProtect = require("../middleware/auth");

//create a user profile
router.put("/update", authProtect, async (req, res, next) => {
  try {
    const { bio, fullName, phoneNumber } = req.body;
    const userId = parseInt(req.user.sub);

    const profile = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        bio: bio,
        fullName: fullName,
        phoneNumber: phoneNumber,
      },
      select: {
        bio: true,
        fullName: true,
        phoneNumber: true,
      },
    });

    if (!profile) {
      return res.status(400).json({ message: "Profile not found" });
    }
    return res
      .status(200)
      .json({ message: "Profile updated successfully", profile });
  } catch (error) {
    next(error);
  }
});

router.get("/", authProtect, async (req, res, next) => {
  try {
    console.log(req.user);
    const profile = await prisma.profile.findFirst({
      where: {
        userId: parseInt(req.user.sub),
      },
      select: {
        bio: true,
        fullName: true,
        phoneNumber: true,
      },
    });

    if (!profile) {
      return res.status(400).json({ message: "Profile not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile found successfully", profile });
  } catch (error) {
    next(error);
  }
});

router.post("/create", authProtect, async (req, res, next) => {
  try {
    const userId = parseInt(req.user.sub);

    const existingProfile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }
    const profile = await prisma.profile.create({
      data: {
        userId: userId,
      },

      select: {
        bio: true,
        fullName: true,
        phoneNumber: true,
      },
    });
    if (!profile) {
      return res.status(400).json({ message: "Profile not created" });
    }
    return res
      .status(201)
      .json({ message: "Profile created successfully", profile });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
