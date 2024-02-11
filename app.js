const express = require("express")
const rateLimit = require("express-rate-limit")
const xss = require('xss-clean')
const helmet = require("helmet") 
const hpp = require('hpp');
const cors = require("cors")
const mongoSanitize = require('express-mongo-sanitize');
var cookieParser = require('cookie-parser')
const routes = require("./src/routes/api")
const path = require("path");
const bodyParser = require('body-parser');



const app = new express();


// Using rate limit middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

app.use(limiter)

// Using helmet for secure http response

app.use(helmet())

// Using xss-clean sanitize for body query params

app.use(xss())

// Using hpp for protect against HTTP Parameter Pollution attacks query req.body params

app.use(hpp())

// Using cors for enabling CORS

app.use(cors())

// Using MongoSanitize for sanitize user input

app.use(mongoSanitize())


// Using cookie parser for set cookie

app.use(cookieParser())

app.use(bodyParser.json({ limit: '10mb' }));
// Database Connect


// api file import


app.use("/api/v1",routes)


// app.use(express.static("client/dist"));

// app.get("*",(req,res)=>{
// 	res.sendFile( path.resolve(__dirname,"client","dist","index.html") )
// })



module.exports = app