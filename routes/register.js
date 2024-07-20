const router = require("express").Router();
const prisma = require("../db");
const becrypt = require("bcrypt");
const generateAccessToken = require("../utils/logincode");
const { EduLevel, BacFiliere, BacLangue, Services } = require("./data"); // Adjust path as needed

router.post("/", async (req, res) => {
  console.log("Request Body:", req.body);

  try {
    const {
      nom,
      prenom,
      age,
      school,
      email,
      gender,
      phone,
      password,
      city,
      niveauxEdu,
      Specialety,
      bacLangue,
      bac1Score,
      bac2Score,
      preferredServices,
    } = req.body;

    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      res.status(400).json({
        message: "This email has been used Before",
        user: {},
      });
      return;
    }

    // Validate enums
    if (!EduLevel.includes(niveauxEdu)) {
      return res
        .status(400)
        .json({ message: `Invalid niveauxEdu: ${niveauxEdu}` });
    }

    if (!BacFiliere.includes(Specialety)) {
      return res
        .status(400)
        .json({ message: `Invalid Specialety: ${Specialety}` });
    }
    if (!BacLangue.includes(bacLangue)) {
      return res
        .status(400)
        .json({ message: `Invalid bacLangue: ${bacLangue}` });
    }

    if (
      !(
        Array.isArray(preferredServices) &&
        preferredServices.every((s) => Services.includes(s))
      )
    ) {
      return res
        .status(400)
        .json({ message: `Invalid preferredServices: ${preferredServices}` });
    }

    const hashedPass = await becrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        nom,
        prenom,
        age,
        school,
        email,
        gender,
        phone,
        password: hashedPass,
        city,
        niveauxEdu,
        Specialety,
        bacLangue,
        bac1Score,
        bac2Score,
        preferredServices,
      },
    });

    if (result) {

      delete result.password

      const token = generateAccessToken(result);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          ...result,
          token
        }
      });
    }
  } catch (error) {
    console.error("Error in Prisma:", error);
    res.status(401).json({ message: "Error in Prisma" });
  }
});

module.exports = router;
