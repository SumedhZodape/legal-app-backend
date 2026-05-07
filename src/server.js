import app from './app.js';
import connectDB from './config/db.js';



// db call
connectDB()




// server
app.listen(3000, ()=>{
    console.log("SERVER IS RUNNING...")
})