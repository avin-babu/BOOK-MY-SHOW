import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { getAllShowsById } from '../api/shows';
import { useNavigate, useParams } from 'react-router';
import { Button, Card, message } from 'antd';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import { bookShow, makePayment } from '../api/booking';
import store from '../REDUX/store';




const STRIPE_PUB_KEY = "pk_test_51QlxEQJeCo8q8bXDfJSxyuuE3feIZ0ywylOiuoGBLh5WfHbBcFNRZnbmRAao4U3zTnyCeFUIALFxFAgG9BJLVahr00Kd2ZZlgb"
function SingleShow() {
    const [show,setShow] = useState();
    const dispatch = useDispatch();
    const params = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const {user} = useSelector((store)=>{return store.user});
    // const [email,setEmail] = useState(null);

    const navigate = useNavigate();
    // console.log('users:',user);
    const getData = async ()=>{
        try{
            // console.log('id:',params.id);
            dispatch(showLoading());
            const showResponse = await getAllShowsById({showId: params.id});
            // console.log('showResponse:', showResponse);
            if(showResponse.success){
                setShow(showResponse.data);
            }
            else{
                message.error(showResponse.message);
            }
            dispatch(hideLoading());
        }
        catch(err){
            dispatch(hideLoading());
            console.log(err);
        }
    }

    const book = async (transactionId,email)=>{
        try{
            dispatch(showLoading());
            console.log('email for email:', email);
            
            const response = await bookShow({
                email: email,
                show: params.id,
                seats: selectedSeats,
                transactionId: transactionId,
                user:user._id
            });
            
            if(response.success){
                message.success("Show Booking done!");
                navigate("/");
            }
            else {
                message.error(response.message);
            }
            dispatch(hideLoading());
        } 
        catch (err) {
            message.error(err.message);
            dispatch(hideLoading());
        }

    }

    const onToken = async (token)=>{
        try{
            console.log('token:', token);
            // setEmail(token.email);
            dispatch(showLoading());
            const response = await makePayment({token:token,amount:selectedSeats.length*show.ticketPrice*100})
            if(response.success){
                message.success(response.message);
                book(response.data,token.email);
            }
            else{
                message.error(response.message);
            }
            dispatch(hideLoading());
        }
        catch(err){
            message.error(err.message);
            dispatch(hideLoading());
        }
    }

    
    // console.log('selected seats:', selectedSeats);
    const getSeats = ()=>{
        let cols = 12;
        let totalSeats = show.totalSeats;
        let rows = Math.ceil(totalSeats/cols);
        
        return  (
            <>
                <div className='flex flex-col align-items-center container'>
                    <div className='font-semibold pb-4 '>
                        All Eyes this way please!
                        <div className='screen-div mt-2'></div>
                    </div>
                
                    <ul className='seat-ul justify-content-center'>
                    {
                        Array.from(Array(rows).keys()).map((row)=>{
                            return (
                                Array.from(Array(cols).keys()).map((col)=>{
                                    let seat = (row*cols)+col+1;
                                    let seatClass = "seat-btn";
                                    if(selectedSeats.includes(seat)){
                                        seatClass += " selected";
                                    }
                                    if(show.bookedSeats.includes(seat)){
                                        seatClass += " booked";
                                    }
                                    if(seat <= totalSeats){
                                        // console.log('seat:', seat);
                                        return (
                                            <li className=''>
                                                <button className={seatClass} onClick={()=>{
                                                    if(selectedSeats.includes(seat)){
                                                        setSelectedSeats(selectedSeats.filter((currSeat)=>currSeat != seat));
                                                    }
                                                    else{
                                                        setSelectedSeats([...selectedSeats,seat]);
                                                    }
                                                }}  >
                                                    {seat}    
                                                </button>
                                            </li>
                                        )
                                        
                                    }
                                }
                            )
                                )
                            }
                            
                            )
                    }
                    </ul>

                    {
                        selectedSeats.length > 0 &&
                            <div className='flex bottom-card border-t border-x-gray-200 shadow-md'>
                                <div className='text-container'>
                                    <div className='flex-1'>Selected Seats :   &nbsp;
                                        <span>
                                            {selectedSeats.join(", ")}
                                        </span>
                                    </div>
                                    <div className='flex-shrink-0 mt-2'>
                                        Total Price :  &nbsp;
                                        <span>
                                            Rs. {selectedSeats.length * show.ticketPrice}
                                        </span>
                                        &nbsp;
                                        <div className='mt-2 '>
                                            <StripeCheckout 
                                                token={onToken}
                                                stripeKey={STRIPE_PUB_KEY}
                                                amount={selectedSeats.length * show.ticketPrice * 100}>
                                                <div>
                                                    <Button type='submit' shape='round' className='bg-blue-700/90 font-semibold text-white' >Pay Now</Button>
                                                </div>
                                            </StripeCheckout>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </>
            
        )      
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    show && 
    <Card title={
        <div className='p-6'>
            <h3 style={{fontSize:30, fontFamily:'roboto', marginBottom:4}}>{show.movies.movieName}</h3>
            <p style={{fontSize:16,fontFamily:'roboto', color:'#666666'}} className='font-semibold '>{show.theatre.name} &nbsp; | &nbsp; {moment(show.date).format("DD MMM")}, {show.time}</p> 
        </div>
    
    }>
        <div style={{fontSize:14,fontFamily:'roboto', color:'#666666', paddingLeft:30, paddingBottom:20,textAlign:'right'}} className='font-semibold'>Rs {show.ticketPrice} Daimond </div>
        {getSeats()}

    </Card>
  )
}

export default SingleShow