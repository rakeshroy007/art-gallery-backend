import multer from 'multer';

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName)
    }
})

// Create multer instance
const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024}   // 5MB limit
})

export default upload;