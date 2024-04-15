const router = require("express").Router();
const prisma = require('../db');
const becrypt = require("bcrypt")
const generateAccessToken = require("../utils/logincode");


router.post("/", async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        const checkEmail = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(checkEmail){
            res.status(400).json({message:"This email has been used Before" , user: null , token : null})
            return ;
        }
        console.log('Request Body:', req.body);
        console.log('Email:', email);
        console.log('Password:', password);

        const hashedPass = await becrypt.hash(password, 10)

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass,
            }
        });
        if (result) {
            const token = generateAccessToken(result)
            res.status(201).json({ message: 'User registered successfully', user: result, token: token });
        }
    } catch (error) {
        console.error('Error in Prisma:', error);
        res.status(401).json({ message: "Error in Prisma" });
    }
});


module.exports = router;