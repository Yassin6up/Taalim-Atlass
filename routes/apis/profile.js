const router = require('express').Router();
const prisma = require('../../db');
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');

router.get('/profile/:id', async (req, res) => {
    try {
        console.log("get profile")
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId) // Ensure userId is parsed as an integer
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Omit sensitive information from the response if needed
        delete user.password

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const uploadDir = path.join(__dirname, '../../upload/profiles');

router.post('/uploadPhoto/:id', (req, res) => {
    const files = req.files; // Assuming the image file is sent in a field named 'image'
    console.log(files)
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    
    // Iterate over each uploaded file
    for (const key in files) {
      const file = files[key];
      
      // Generate a unique file name
      const fileName = `${uuidv4()}_${file.name}`;
      
      // Move the uploaded file to the uploads directory
      const filePath = path.join(uploadDir, fileName);
      file.mv(filePath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to upload file' });
        } 
        
        // Update the user's photo in the database
        await prisma.user.update({
          where: { id: req.params.id },
          data: { photo: fileName }
        });
      });
    }
    
    res.status(200).json({ message: 'Files uploaded successfully' });
});




router.get("/upload/:filename" , (req,res)=>{
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
  
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
  
    res.sendFile(filePath);
})


router.put("/profile/update/specialtyAndLevel", async (req, res) => {
    try {
        // Extract required fields from request body
        const { specialty, level , email} = req.body;
        console.log(req.body)

        // Check if any required field is missing
        if (!specialty || !level ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Update user profile using Prisma
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                Specialety : specialty , 
                level : level
            }
        });

        // Respond with the updated user object
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.put("/profile/update/", async (req, res) => {
    try {
        // Extract required fields from request body
        const { fullName, phone, city , email} = req.body;

        // Check if any required field is missing
        if (!fullName || !phone || !city) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Update user profile using Prisma
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                name : fullName,
                phone,
                city
            }
        });

        // Respond with the updated user object
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.put("/profile/updatePass/:id" , async(req , res)=>{
    const {currentPass  , newPass} = req.body
    console.log(req.body)

    const hashNewPass = await bcrypt.hash(newPass , 10)


    try{
    const user = await prisma.user.findUnique({where: {email : req.params.id} }).catch((e)=> res.status(404).json(e) )
    const matchPass = await bcrypt.compare( currentPass , user.password)
    if(matchPass){
        console.log("passcode match")
        console.log("curentPass : " ,user.password )
        console.log("typedPasscode : " ,currentPass )
        await prisma.user.update({
            where : {
                email : user.email
            },
            data :{
                password : hashNewPass
            }
        }).then((result)=>{
            res.json({message : "ok" , result})
        }).catch((e)=>{
            res.json(e)
        })
    }else{
        console.log("password not match")
        res.status(401).json({message : "old Password is not correct"})
    }
}catch(e){
    res.json(e)
}
})


router.delete("/profile/delete" , async (req , res)=>{
    try{
        prisma.user.delete({
            where: {
                email : req.user.email
            }
        }).then((result)=>{
            res.json(result)
        }).catch((er)=>{
            res.json(er)
        })
    }catch(e){
        res.json(e)
    }
})

module.exports = router

