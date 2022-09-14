const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


//creating routes for scalabe architechure
const userRoute = require('./api/routes/user');

//mongoose connection request
mongoose.connect("mongodb+srv://yuvraj:Yuvraj@cluster0.xaergz0.mongodb.net/test").then(()=>{
    console.log("database is connected");
}).catch((error)=>{
    console.log(error);

})

// mongoose.connect(`mongodb+srv://railroad:${process.env.MONGO_PASS}@railroad.hctxgqn.mongodb.net/?retryWrites=true&w=majority`);

//using bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.get("/",(req,res)=>{
//     res.send('home');

// })

//handling CORS errors by adding headers
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //for options request
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, PATCH')
        res.status(200).json({});
    }
    next();
});
// app.get("/register",(req,res)=>{
//     res.send("./register")
// });

//forwarding routes 
app.use('/user', userRoute);
userRoute.get("/",(req,res)=>{
    res.send('./index.html')
})

//handling errors 404 and 500 errors and sending a response
app.use((req, res,next) =>{
    const error = new Error();
    error.status = 404;
    next(error);
});

// a funnel for all other errors !404 
app.use((error, req, res, next)=>{
    res.status = error.status || 500;
    res.json({
        error : error.message
    });
});


module.exports = app;