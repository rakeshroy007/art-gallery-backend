import express from "express" ;
import connectToMongo from './db.js' ;
import authRoutes from './routes/auth.js' ;
import imageRoutes from './routes/image.js' ;
import publicRoutes from './routes/public.js' ;
import cors from 'cors' ;

const app = express() ;

connectToMongo() ;

// Middleware
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/images', imageRoutes);
app.use('/api', publicRoutes);



app.listen(5000, ()=> {
    console.log("Server running on port 5000")
})