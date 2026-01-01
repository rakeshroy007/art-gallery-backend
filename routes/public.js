import express from 'express' ;
import Image from '../models/Image.js';

const router = express.Router() ;

// User public profile
router.get('/profile/:username', async(req, res) => {
    try {
        const images = await Image.find({
            username: req.params.username
        }).sort({ createdAt: -1 })


        res.status(200).json(images);
    } catch (error) {
        console.error("Profile fetch error: ", error)
        res.status(500).json({
            success: false,
            error: "Failed to fetch user profile images"
        })
    }
})

export default router;