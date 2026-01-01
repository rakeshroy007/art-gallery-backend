import express from 'express'
import Image from '../models/Image.js';
import User from '../models/User.js'
import upload from '../config/multer-config.js';

const router = express.Router() ;

// Middleware to verify user (simple version)
const verifyUser = async (req, res, next) => {
  try {
    const username = req.headers['x-username'];

    if(!username) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized: username missing"
        })
    }

    const user = await User.findOne({ username });

    if(!user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: user not found'
        })
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({
        success: false,
        error: "Auth verificatio failed"
    })
  }
};

// Upload image route
router.post('/upload', verifyUser, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' })
        }

        const image = await Image.create({
            userId: req.user._id,
            username: req.user.username,
            imageUrl: req.file.path
        })

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Image upload failed"
        })
    }
})


// Fetch user's images from backend
router.get('/my', verifyUser, async (req, res) => {
    try {
        const images = await Image.find({
            userId: req.user._id
        })
        .sort({ createdAt: -1 })
        .limit(8);               // 🔥 max 8 images

        res.json({
            success: true,
            images
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            error: "Failed to fetch images"
        });
    }
})


// Select Random Images API
router.get('/random', async (req, res) => {
    try {
        const images = await Image.aggregate([
            {
                $sample: { size: 8 }
            }
        ])

        res.status(200).json(images);

    } catch (error) {
        console.error("Random images error:", error)
        res.status(500).json({
            success: false,
            error: "Failed to fetch random images"
        })
    }
})



export default router;