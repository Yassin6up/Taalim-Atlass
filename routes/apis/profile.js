const router = require('express').Router()
const prisma  = require('../../db')
const bcrypt = require("bcrypt")

router.get('/profile' , async(req , res)=>{
    try{
        prisma.user.findUnique({
            where : {
                id : req.query.uid
            }
        }).then((result)=>{
            res.json(result)
        }).catch((error)=>{
            res.json(error)
        })
    }catch(e){
        res.status(401).json(e)
    }
})

router.get("/photoProfile/:id" , async (req,res)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id : req.params.id
            }
        })
        
        const photoUrl = user.photo

        res.status(200).sendFile(photoUrl)

    }catch(e){
        res.status(401).json(e)
    }   
})



router.put("/profile/update" , async (req,res)=>{
    try{   
        prisma.user.update({
            where  : {
                email :  req.user.email
            } ,
            data : req.body
        }).then((result)=>{
            res.json(result )
        }).catch((e)=>{
            res.json(e)
        })
    }catch(err){
        res.json(err)
    }
})


router.put("/profile/updatePass" , async(req , res)=>{
    const {currentPass  , newPass} = req.body
    const hashNewPass = await bcrypt.hash(newPass , 10)
try{
    const user = await prisma.user.findUnique({where: {email : req.user.email} }).catch((e)=> res.status(404).json(e) )
    const matchPass = await bcrypt.compare( currentPass , user.password)
    if(matchPass){
        await prisma.user.update({
            where : {
                email : user.email
            },
            data :{
                password : hashNewPass
            }
        }).then((result)=>{
            res.json(result)
        }).catch((e)=>{
            res.json(e)
        })
    }else{
        res.json({message : "old Password is not correct"})
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

