import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getMovieById } from '../api/movies';
import { Button, Card, Col, Flex, Input, message, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { getAllShowsByMovie } from '../api/shows';
import 'moment'
import moment from 'moment';


function SingleMoviePage() {
    const [movie,setMovie] = useState(null);
    const params = useParams();
    const [time,setTime] = useState("");
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();
    const [date,setdate] = useState(moment().format("YYYY-MM-DD"));
    const [isBookModelOpen, setBookModelOpen] = useState(false);
    const navigate = useNavigate();

    const theatreDetails = (theatre)=>{
        const theatreShows = theatre.shows.sort((a,b)=>{
            return moment(a.time,"HH:mm") - moment(b.time,"HH:mm")
        }).filter((element)=>{
            console.log('element:', moment(element.time,"HH:mm")>moment.now("HH:mm"));
            
            return moment(element.time,"HH:mm") > moment.now("HH:mm");
        })

        const theateShowsCount = theatreShows.length;

        return(
            theateShowsCount === 0 ? "" :
            <div key={theatre._id} className='mt-6 pt-3 ml-10'>
                                                <Row gutter={24} key={theatre._id}>
                                                    <Col xs={{span:24}} lg={{span:8}}>
                                                        <h3 style={{fontFamily:'roboto'}} className='font-semibold text-sm'>{theatre.name}</h3>
                                                    </Col>
                                                    <Col xs={{span: 24}} lg={{span: 16}}>
                                                        
                                                        {
                                                                theatreShows.map((singleShow)=>{
                                                                    return (
                                                                        <span key={singleShow._id} onClick={()=>{navigate(`/book-show/${singleShow._id}`)}} style={{border: '1px solid grey', padding: 8, marginRight:20, borderRadius: 5, color:'green', fontSize:13, cursor:'pointer'}}>
                                                                            {moment(singleShow.time,"HH:mm").format("HH:mm A")}
                                                                        </span>
                                                                    )
                                                                })
                                                            }
                                                    </Col>
                                                </Row>
                                            </div>
        )
    }

    const showDetails = (value)=>{
        return(
            <div className='mb-10'>
                                    <h2 className='text-2xl font-bold pl-10'>Theatres</h2>
                                    <div className='flex justify-center'>
                                        <Input type='date'  style={{inlineSize:130,borderColor:'black'}} onChange={handleDate} min={moment().format("YYYY-MM-DD")}  value={date} />
                                    </div>
                                    {value.map((theatre)=>{
                                        
                                        return (
                                            <>
                                            {theatreDetails(theatre)}
                                            </> 
                                        )
                                    })}
                                </div>
        )
    }

    const getData = async ()=>{
        try{
            dispatch(showLoading());
            const movieResponse = await getMovieById({movieId:params.id});
            console.log('movie response from single page: ', movieResponse);
            
            if(movieResponse.success){
                setMovie(movieResponse.movies);
            }else{
                message.error(movieResponse.message);
            }
            dispatch(hideLoading());
        }
        catch(err){
            dispatch(hideLoading());
            console.log(err);
        }
    }
    
    const getAllTheatre = async ()=>{
        try{
            dispatch(showLoading());
            const response = await getAllShowsByMovie({movie: params.id, date});
            console.log('theatre show response:', response);
            if(response.success){
                setTheatres(response.shows);
            }else{
                message.error(response.message);
            }
            dispatch(hideLoading());
        }catch(err){
            dispatch(hideLoading());
            message.err(err.message)
        }

    }
    const getTime = ()=>{
        const time = movie?.duration;
        if(time){
            const timeString = `${Math.floor(time/60)}h ${time%60}m`;
            setTime(timeString);
        }
        
    }
    const handleDate = (e)=>{
        setdate(moment(e.target.value).format("YYYY-MM-DD"));
        navigate(`/movie/${params.id}?date=${e.target.value}`);
    }
    useEffect(()=>{
        getData();
    },[]);
    useEffect(()=>{
        getTime()
    },[movie])
    useEffect(() => {
        getAllTheatre();
    }, [date])
    // console.log('theatres:', theatres);
    // console.log('isbook:', isBookModelOpen)
    console.log('theatres:', theatres);
  return (
    <>
        {movie && 
            <Card styles={{header: {fontSize:20,fontFamily:'sans-serif'}}}>
                <Flex style={{padding:100,margin:10}} className='bg-black' align='horizontal'>
                    <img 
                        alt='movie-poster'
                        src={movie.poster}  
                        style={{width:250,height:350, borderRadius:15}}
                        
                    />
                    <Flex vertical style={{ padding: 32 }}>
                        <Typography.Title level={1} style={{color:'white', fontFamily:'roboto', fontSize:36}}>
                            {movie.movieName}
                        </Typography.Title>
                        <Typography.Paragraph copyable style={{color:'white',fontSize:16}}>
                            {movie.description}
                        </Typography.Paragraph>
                        <div style={{backgroundColor:'whitesmoke',padding:'2px 8px',borderRadius:5,inlineSize:'95.71px', height:'28px', textAlign:'center',fontSize:'15px'}}>
                            {movie.language} 
                        </div>
                        <Typography.Paragraph style={{color:'white',fontSize:16,marginTop:20,}}>
                            <span className='pr-2'>{time}</span>
                            <span className='pr-2'> • </span>
                            <span className='pr-2'>{movie.genre}</span>
                            <span className='pr-2'> • </span>
                            <span className='pr-2'>{new Date(movie.releaseDate).toLocaleDateString
                                ('en-GB',{
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  }).replace(/(\w{3}) (\d{4})$/, '$1, $2')}
                            </span>
                        </Typography.Paragraph>
                        <Button type='primary' style={{width:'214px',height:'48px',color:'white',marginTop:'25px',borderRadius:10,cursor:'pointer'}} className='bg-red-400/80 font-semibold text-base border-none' onClick={()=>{
                            setBookModelOpen(true);
                        }}>
                            Book Tickets
                        </Button>
                    </Flex>
                </Flex>
                
            </Card>
        }
        
       
        {   
            
                    isBookModelOpen && <div>
                        {
                            theatres.length === 0 ? 
                            <div className="pt-3">
                                <h2 className='text-2xl font-bold pl-10 pb-3'>Theatres</h2>
                                <div className='flex justify-center'>
                                    <Input type='date'  style={{inlineSize:130,borderColor:'black'}} onChange={handleDate} min={moment().format("YYYY-MM-DD")}  value={date} />
                                </div>
                                <h2 className="font-semibold text-red-700 pl-10 text-lg mb-10">Currently, no theatres available for this movie!</h2>
                            </div>
                            :
                            <div>
                                {showDetails(theatres)}
                            </div>
                        }
                    </div>
        } 
    </>
  )
}

export default SingleMoviePage