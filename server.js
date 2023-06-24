import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import indexRouter from './Routes/index.js';
import adminRouter from './Routes/admin.js';

const app = express();

// app.use(cors()); // Enable CORS before any routes

app.use(cors({
    origin: '*',
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);
app.use(adminRouter);

const PORT = 5000;
const MONGODB_URI =
  'mongodb+srv://Vincent:Physics1994RF@cluster0.9g5v63g.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Allow requests from any origin
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
