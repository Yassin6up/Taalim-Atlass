const router = require('express').Router();
const prisma = require('../../db');
const fs = require('fs');
const path = require('path');


router.get("/mattiers", async (req, res) => {
  const { sepiciality, level } = req.query

  if (sepiciality && level) {
    console.log(req.query)
    const mattier = await prisma.mattier.findMany({
      where: {
        level: level,
        speciality: sepiciality
      }
    })
    res.status(200).json(mattier)
  } else {
    console.log("no query")
    res.status(401).json({ message: 'no query' })
  }
})

const uploadDir = path.join(__dirname, '../../upload/mattier');


router.post('/mattier/uploadPhoto/:id', (req, res) => {
  const file = req.files.image; // Assuming the image file is sent in a field named 'image'

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Move the uploaded file to the uploads directory
  const filePath = path.join(uploadDir, file.name);
  file.mv(filePath, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }
    await prisma.mattier.update({
      where: {
        id: req.params.id
      },
      data: {
        photo: file.name
      }
    })

    res.status(200).json({ message: 'File uploaded successfully', filename: file.name });
  });
});



router.get("/mattier/upload/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
})

router.get("/mattier/titles", async (req, res) => {
  try {
    const titles = await prisma.mattier.findMany({});

    // Extract unique specialties while preserving the format
    const uniqueSpecialties = titles.reduce((acc, curr) => {
      if (!acc.find(item => item.speciality === curr.speciality)) {
        acc.push({ id: curr.id, speciality: curr.speciality, level: curr.level });
      }
      return acc;
    }, []);

    // Send response
    res.status(200).json(uniqueSpecialties);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/mattiers/courses', async (req, res) => {
  console.log(req.query)
  const { lessionId } = req.query

  const corses = await prisma.cours.findMany({
    where: {
      listCorsesId: +lessionId
    }
  })
  if (corses) {
    res.status(200).json(corses)
  } else {
    res.status(401).json(corses)
  }
})




router.get('/mattiers/lession', async (req, res) => {
  console.log(req.query)
  const { mattierId } = req.query

  const corses = await prisma.Lession.findMany({
    where: {
      mattierId: +mattierId
    }
  })

  if (corses) {
    res.status(200).json(corses)
  } else {
    res.status(401).json(corses)
  }
})

router.get('/mattiers/playListVideos', async (req, res) => {
  console.log(req.query)
  const { courseId  } = req.query

  const playList = await prisma.playList.findMany({
    where: {

      courseId : +courseId
    }
  })
  if(playList){
    const videos = await prisma.video.findMany({
      where: {
        playListId: playList[0].id
      }
    })

    if (videos) {
      res.status(200).json({playList : playList , video : videos})
    } else {
      res.status(401).json({playList : playList , video : videos})
    }
  }
})


router.get('/mattiers/playListVideos/video', async (req, res) => {
  console.log(req.query)
  const { videoId } = req.query

  const video = await prisma.video.findUnique({
    where  : {
      id : +videoId
    }
  })


  if ( video) {
    res.status(200).json(video)
  } else {
    res.status(401).json(video )
  }
})






const uploadDirCourses = path.join(__dirname, '../../upload/course_type');

router.get("/courses/upload/:filename", (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(uploadDirCourses, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
})






router.get('/mattiers/tasks', async (req, res) => {
  console.log(req.query)
  const { userId  , lessionId  } = req.query

  const tasks = await prisma.tasks.findMany({
    where: {
      lessionId : +lessionId
    }
  })
  

    if (tasks) {
      res.status(200).json({tasks : tasks })
    } else {
      res.status(200).json({tasks : tasks , message : "No task found"})
    }
  
})





module.exports = router