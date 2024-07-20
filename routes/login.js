const router = require("express").Router()
const prisma = require("../db")
const generateAccessToken = require("../utils/logincode")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = generateAccessToken(user);
                res.json({ user: {...user, token}, message : "ok" });
            } else {
                res.status(401).json({ message: 'Invalid Password' });
            }
        } else {
            res.status(404).json({ message: 'Email is not exist' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router
