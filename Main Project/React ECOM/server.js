import express from 'express';
import colors  from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js'
import DeliveryRoutes from './routes/DeliveryRoute.js'
//import paymentController from './controllers/paymentController.js'

import cors from 'cors';


import Razorpay from './routes/payment.js';


//app.post('/razorpay/order', paymentController.createRazorpayOrder);

//config env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

//config morgan (middile ware)
app.use(express.json())
app.use(morgan('dev'))

app.use(express.json());

app.use(cors()); // Add this line to enable CORS --gpt

//routes
app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/category",categoryRoutes);

app.use("/api/v1/product",productRoutes);

app.use("/api/v1/payment",Razorpay);

app.use("/api/v1/Delivery",DeliveryRoutes);



//rest api
app.get('/', (req,res)=>{
    res.send('<h1>Welcome to MERN stack project</h1>');

});

//port

const PORT = process.env.PORT || 8080 ;

//run / listen

app.listen(PORT, () => {
    console.log(`server Running on ${process.env.DEV_MODE} mode || on port ${PORT}`.bgCyan);
})
