import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import indexRouter from './Routes/index.js';
import adminRouter from './Routes/admin.js';

const app = express();

app.use(cors()); // Enable CORS before any routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);
app.use(adminRouter);



mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://Vincent:Physics1994RF@cluster0.9g5v63g.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(5000, ()=> {
        console.log(`Node API app is running on port 5000`)
    });
}).catch((error) => {
    console.log(error)
})