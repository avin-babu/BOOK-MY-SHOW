const express = require('express');
require('dotenv').config();
const userRouter = require('../server/ROUTES/loginRoutes.js');
const movieRouter = require('./ROUTES/movieRoutes.js')
const theatreRouter = require('./ROUTES/theatreRoutes.js');
const showRouter = require('./ROUTES/showRoutes.js');
const bookingRoute = require('./ROUTES/bookingRoute.js');

const app = express();
// const cors = require('cors');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use("/api/users",userRouter);
app.use('/api/movies',movieRouter);
app.use('/api/theatres',theatreRouter);
app.use('/api/shows',showRouter);
app.use('/api/bookings',bookingRoute);

const dbConnect = require('./CONFIG/db.js');



dbConnect();

// const express = require('express');
// const cors = require('cors');

// app.use(cors({
//     origin: 'http://localhost:3000', // allow requests from your React app
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));


  

const port =8082;
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})