import express from 'express' ;
import User from '../models/User.js';
import bcrypt from 'bcrypt'

const router = express.Router() ;

router.post("/signup", async (req, res) => {
    try {
        // 1. Extract only necessary fields (prevent extra fields)
        const { username, email, password } = req.body ;

        // 2. Validation checks
        if(!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide all fields(username, email, password)"
            })
        }

        if(password.length < 6) {
            return res.status(400).json({
                success: false,
                error: "Password must be at least 6 characters"
            })
        }

        // 3. Check if user already exists
        const existingUser = await User.findOne({email}) ;
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User with this email already exists"
            })
        }

        // 4. Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create user with hashed password
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        //6. Send response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error("Signup error:", error)
        res.status(500).json({
            success: false,
            error: "Server error during registration"
        })
    }
})

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body ;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password"
            })
        }

        // Find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            })
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                error: "Invlid credentials"
            })
        }

        // Login Successful
        res.json({
            success: true,
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({
            success: false,
            error: "Server error during login"
        })
    }
})

export default router ;