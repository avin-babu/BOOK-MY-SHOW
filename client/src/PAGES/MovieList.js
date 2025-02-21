import React, { useEffect, useState } from 'react'
import { Button, message, Table } from 'antd';
import {deleteMovieById, getAllMovies} from '../api/movies'
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MovieForm from './MovieForm';

function MovieList() {
  const [allUsers,setAllUsers] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);
  const [isModelOpen,setIsModelOpen] = useState(false);
  const [modelType, setModelType] = useState("add");

  const dispatch = useDispatch();

  const deleteMovieHanlder = async (value)=>{
    try{
      dispatch(showLoading());
      // console.log('values of delete response:', value);
      
      const deleteResponse = await deleteMovieById({movieId: value._id});
      if(deleteResponse.success){
        message.success(deleteResponse.message);
        getData();
      }
      else{
        message.error(deleteResponse.message);
      }
      dispatch(hideLoading());
    }
    catch(err){
      dispatch(hideLoading());
      console.log('error while deleting the movie: '.err.message);
      
    }
  }

  const getData = async ()=>{
    dispatch(showLoading());
    const response  = await getAllMovies();
    // console.log('movie  response: ', response)
    const usersList = response.movies;
    // console.log('usersList:', usersList);
    
    setAllUsers(
      usersList.map(function(item){
        return {...item, 'key': `movies${item._id}`};
      })
    );
    dispatch(hideLoading());
  }
  useEffect(()=>{
    getData();
  },[])
 
      const columns = [
        {
          title: 'Poster',
          dataIndex: 'poster',
          render: (text,movie)=>{
            return(
              <img 
                width="75"
                height="115"
                style={{ objectFit: "cover", background: `url(${text})`, backgroundSize: "cover" }}
             />
            )
          }
        },
        {
          title: 'Movie Name',
          dataIndex: 'movieName',
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Language',
            dataIndex: 'language',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            render: (text,data)=>{
              return new Date(text).toLocaleDateString();
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text,data)=>{
              return (
                <div className='d-flex justify-content-end'>
                  <Button onClick={()=>{
                    setIsModelOpen(true);
                    setModelType("Edit");
                    setSelectMovie(data);
                  }
                  }><EditOutlined/></Button>
                  <Button onClick={()=>{
                    deleteMovieHanlder(data);
                  }}><DeleteOutlined/></Button>
                </div>
              )
            }
        },
      ];
      
      
  return (
    <>
      <div className='flex flex-row-reverse mb-5'>
        <Button className='bg-blue-600/90 font-semibold text-white' onClick={()=>{
          setIsModelOpen(true);
          setModelType("Add");
        }}>ADD MOVIE</Button>
      </div>
      <Table dataSource={allUsers} columns={columns} />
        {
          isModelOpen && (<MovieForm modelType={modelType} isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} selectMovie={selectMovie} setSelectMovie={setSelectMovie} getData={getData}/>)
        }
    </>
  )
}

export default MovieList