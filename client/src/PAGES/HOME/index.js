import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../../api/users';
import { getAllMovies } from '../../api/movies';
import { Col, Input, message, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../REDUX/loaderSlice';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

function Home() {
const dispatch = useDispatch();
const [movies,setMovies] = useState(null);
const [searchText,setSearchText] = useState("");
const navigate = useNavigate();

const getData = async ()=>{
  try{
    dispatch(showLoading());
    const movieResponse = await getAllMovies();
    console.log('movie response: ', movieResponse);
    
    if(movieResponse.success){
      setMovies(movieResponse.movies);
    }
    else{
      message.error('error occured while fetching movies');
    }
    dispatch(hideLoading());
  }
  catch(err){
    dispatch(hideLoading());
    message.error(err);
  }
  
}

const handleSearch = (e)=>{
  setSearchText(e.target.value);
  console.log('search text:', searchText);
  
}
useEffect(()=>{
  // const fetchUser = async ()=>{
  //   const response = await getCurrentUser();
  //   console.log('response:',response);
  // }
  // fetchUser();
  getData();
},[])

console.log('moviewss:',movies)
  return (
    <>
      <Row className='justify-center'>
        <Col xs={{span: 24}} lg={{span: 12}}>
          <Input
            placeholder='Enter the movie name'
            suffix={<SearchOutlined />}
            onChange={handleSearch}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      
      <Row className='justify-center' gutter={{xs:8,sm:16,md:24,lg:32}}>
        {movies && movies.filter((movie)=>{
          return movie.movieName?.toLowerCase().includes(searchText.toLowerCase());
        })
        .map((movie)=>{
         return(
          <Col 
            className='gutter-row mb-5'
            key={movie._id}
            span={{
              xs: 24,
              sm: 24,
              md: 12,
              lg: 10,
            }}
          >
            <div className='text-center gap-2'>
              
                <img 
                  className='cursor-pointer mb-4'
                  src={movie.poster} 
                  alt="Movie Poster"
                  style={{ borderRadius: "8px" ,width:211,height:358.7}}
                  onClick={()=>{
                    navigate(`/movie/${movie._id}?date=${new Date().toISOString().split('T')[0]}`)
                  }}
                />
              
              
                <h3 className='cursor-pointer font-semibold  text-lg'
                  onClick={()=>{
                    navigate(`/movie/${movie._id}?date=${new Date().toISOString().split('T')[0]}`)
                  }}>
                  {movie.movieName}
                </h3>
              
              
            </div>
          </Col>
         ) 
        })}
      </Row>
    </>
  )
}

export default Home