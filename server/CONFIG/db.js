const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const dbConnect = async ()=>{
    try{
        await mongoose.connect(dbUrl);
        console.log('Connected to DB');
    }
    catch(err){
        console.log('Error occured while connecting to DB');
    }
}

module.exports = dbConnect;
