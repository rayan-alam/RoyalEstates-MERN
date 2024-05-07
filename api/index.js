import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect("mongodb+srv://admin-100xDev:OGx8UVzqL5hVIO1w@cluster0.i0euznc.mongodb.net/mern-marketplace?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });
// const mongoURI = process.env.MONGO;
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Error connecting to MongoDB", err);
//   });

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    
}); 

app.listen(3000, () => {
    console.log("Server live on port 3000");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})