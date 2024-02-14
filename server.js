const app = require("./app");
const connectDB = require("./db")

require("dotenv").config();


const PORT = process.env.PORT||8080;


app.listen(PORT, async ()=>{
    console.log(`server run successfully http://localhost:${PORT} `);
    await connectDB()
})