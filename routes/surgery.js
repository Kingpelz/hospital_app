const express = require("express");
const router = express.Router();
const prisma = require("../helper/prisma");
const authProtect = require("../middleware/auth");

// appointment.js

router.post("/create", authProtect, async (req, res, next) => {
  try {
    const { description, doctorId, surgeryType, time, surgeryDate } = req.body;
    const userId = req.user.sub;
    const surgery = await prisma.surgery.create({
      data: {
        surgeryType: surgeryType,
        description: description,
        doctorId: parseInt(doctorId),
        userId: parseInt(userId),
        time: time,
        surgeryDate: surgeryDate,
      },
      select: {
        surgeryType: true,
        description: true,
        doctorId: true,

        surgeryDate: true,
        time: true,
      },
    });
    if (!surgery) {
      return res.status(400).json({ message: "Surgery not created!" });
    }
    return res
      .status(201)
      .json({ message: "Surgery created successfully", surgery });
  } catch (error) {
    next(error);
  }
});

router.get("/all", authProtect, async (req, res, next) => {
  try {
    const surgeries = await prisma.surgery.findMany({
      where: {
        userId: parseInt(req.user.sub),
      },
      select: {
        surgeryType: true,
        description: true,
        doctorId: true,
        surgeryDate: true,
        time: true,
      },
    });
    if (!surgeries) {
      return res.status(404).json({ message: "No surgeries found" });
    }
    return res.status(200).json({ message: "Surgeries found", surgeries });
  } catch (error) {
    next(error);
  }
});

router.get("/single/:id", authProtect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const surgery = await prisma.surgery.findFirst({
      where: {
        id: parseInt(id),
        userId: parseInt(req.user.sub),
      },
      select: {
        surgeryType: true,
        description: true,
        doctorId: true,

        surgeryDate: true,
        time: true,
        id: true,
      },
    });
    if (!surgery) {
      return res.status(404).json({ message: "Surgery not found" });
    }
    return res.status(200).json({ message: "Surgery found", surgery });
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", authProtect, async (req, res, next) => {
  try {
    const userId = req.user.sub;
    const { description, doctorId, surgeryType, surgeryDate, status } = req.body;
    const  surgeryId  = req.params.id;
    // console.log(userId,surgeryId, description, doctorId, surgeryType, surgeryDate, status);
    const surgery = await prisma.surgery.findUnique({
      where: {
        id: parseInt(surgeryId),
        userId: userId,
      },
    });

    if (!surgery) {
      return res.status(404).json({ message: "Surgery not found" });
    }

    const updatedSurgery = await prisma.surgery.update({
      where: {
        id: parseInt(surgeryId),
        userId: userId,
      },
      data: {
        surgeryType: surgeryType,
        description: description,
        doctorId: doctorId,
        userId: userId,
        surgeryDate: surgeryDate,
        status: status,
      },
    });
    if (!updatedSurgery) {
      return res.status(400).json({ message: "Surgery not updated" });
    }
    return res
      .status(200)
      .json({ message: "Surgery updated successfully", updatedSurgery });
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", authProtect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const surgery = await prisma.surgery.findUnique({
      where: {
        id: parseInt(id),
        userId: req.user.sub,
      },
    });
    if (!surgery) {
      return res.status(404).json({ message: "Surgery not found" });
    }
    const deletedSurgery = await prisma.surgery.delete({
      where: {
        id: parseInt(id),
        userId: req.user.sub,
      },
    });
    if (!deletedSurgery) {
      return res.status(400).json({ message: "Surgery not deleted" });
    }
    return res
      .status(200)
      .json({ message: "Surgery deleted successfully", deletedSurgery });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
