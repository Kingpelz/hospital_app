const express = require("express");
const router = express.Router();
const prisma = require("../helper/prisma");

router.post("/create", async (req, res, next) => {
  try {
    const {name, speciality  } = req.body;

    const doctor = await prisma.doctor.create({
      data: {
        name:name,
       speciality:speciality
      },
      select: { 
        name: true,
       speciality: true
      },
    });

    if (!name || !speciality ) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    return res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res,next) => {
  try {
    const doctor = await prisma.doctor.findMany(
      { select: {
        name: true,
       speciality: true
      },
    }
    );
    
    if (!doctor) {
      return res.status(404).json({ error: "No doctor found" });
    }
    return res.status(200).json({ message: "doctor fetched successfully", doctor });
  } catch (error) {
    next(error);
  }
});

router.get("/single/:id", async (req, res,next) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        name: true,
       speciality: true
      },
    });
    if (!doctor) {
      return res.status(404).json({ error: "No doctor found" });
    }
    return res.status(200).json({ message: "doctor fetched successfully", doctor });
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res,next) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!doctor) {
      return res.status(404).json({ error: "No doctor found" });
    }
    const deletedDoctor = await prisma.doctor.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!deletedDoctor) {
      return res.status(400).json({ error: "Doctor not deleted" });
    }
    return res.status(200).json({ message: "Doctor deleted successfully", deletedDoctor });

  } catch (error) {
    next(error);
  }
});


router.put("/update/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const { name, speciality} = req.body;

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!doctor) {
      return res.status(404).json({ error: "No doctor found" });
    }
    const updatedDoctor = await prisma.doctor.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
       speciality
      },
    });
    if (!updatedDoctor) {
      return res.status(400).json({ error: "Doctor not updated" });
    }
    return res.status(200).json({ message: "doctor updated successfully", updatedDoctor });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
