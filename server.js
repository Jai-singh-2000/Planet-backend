const express=require("express");
const connectDb=require("./config/config") 
const dotenv=require("dotenv");
const productRouter=require('./routes/ProductRouter');
const userRouter=require('./routes/UserRouter')
const shippingRouter=require("./routes/ShippingRouter")
const authToken=require("./middlewares/authToken")
const orderRouter = require("./routes/OrderRouter");
const contactRouter = require("./routes/ContactRouter");
const main=require('./config/mail')
const PORT=4000;
dotenv.config();
const cors=require("cors");

connectDb()//Connecting to mongo db database
const app=express(); // To make server from express use only one time at server file
app.use(cors())
app.use(express.json())
app.use(userRouter);
app.use(productRouter);
app.use(authToken,contactRouter);
app.use(authToken,shippingRouter);
app.use(authToken,orderRouter);

app.listen(process.env.PORT||PORT,()=>{
    console.log(`${process.env.NODE_ENV} Server is working on ${process.env.PORT} `);
})