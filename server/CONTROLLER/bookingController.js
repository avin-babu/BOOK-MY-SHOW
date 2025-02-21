
const emailHandler = require('../CONFIG/emailHandler');
const bookingModel = require('../MODEL/bookingModel');
const showModel = require('../MODEL/showModel');
const { getShowById } = require('./showController');
const moment = require('moment');

console.log('moment:',moment);

const stripe = require('stripe')(process.env.STRIPE_KEY)

const makePayment = async (req,res)=>{
    try{
        const {token,amount} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!"
        })

        const paymentId = paymentIntent.id;
        return res.send({
            success: true,
            message: "Payment Successful! Ticket(s) booked!",
            data: paymentId
        });

    }
    catch(err){
        return res.send({
            success: false,
            message: err.message
        })
    }
}

const bookShow = async (req,res)=>{
    try{
        const body = req.body;
        const bookResponse = new bookingModel(body);
        await bookResponse.save();

        const show = await showModel.findById({_id:req.body.show}).populate("movies").populate("theatre");
        console.log('show:', show);
        const updatedBookedSeats = [...show.bookedSeats,...req.body.seats];
        await showModel.findByIdAndUpdate({_id:req.body.show},{bookedSeats:updatedBookedSeats});

        emailHandler("ticket.html",body.email,{
            moviePosterUrl: show.movies.poster,
            movieName: show.movies.movieName,
            theatreName: show.theatre.name,
            time: `${moment(show.date).format("DD MMM")}, ${show.time}`,
            address: show.theatre.address,
            seatNumbers: `${req.body.seats.join(", ")}`
        })
        
        return res.send({
            success: true,
            message: 'New Booking done!',
            data: bookResponse
        });

        

    }
    catch(err){
        return res.send({
            success: false,
            message: err.message
        });
    }
}
module.exports = {
    makePayment,
    bookShow
}