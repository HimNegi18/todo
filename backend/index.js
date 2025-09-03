const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoute');
const todoRoutes = require('./src/routes/todoRoute');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3000;

// Middleware (to use middleware we use 'app.use()' )
app.use(cors({
    origin: 'https://todo-glccaocsi-himanshu-negis-projects.vercel.app', //frontend url
    credentials: true //Allow cookies
}));
app.use(cookieParser()); //parse cookies.
app.use(express.json()); //to convert JSON bodies.

//Routes
app.get('/', (req,res) =>{
    res.send('server is running');
})
app.use('/api', userRoutes);
app.use('/api', todoRoutes);

// Server start
app.listen(port, ()=>{
   console.log('Server running on http://localhost: '+ port );
}) 