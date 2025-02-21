import { Button, Col, Form, Input, message, Row, Select, Table } from 'antd';
import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllMovies } from '../api/movies';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { addShow, deleteShows, getAllShowsByTheatre, updateShow } from '../api/shows';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

function ShowModel({isShowModelOpen,setIsShowModelOpen,selectedTheatre}) {

  const [view,setView] = useState('table');
  const [movies,setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shows,setShows] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async ()=>{
    try{
      dispatch(showLoading());
      const movieResponse = await getAllMovies();
      if(movieResponse.success){
        setMovies(movieResponse.movies);
      }
      else{
        message.error(movieResponse.message);
      }

      const showResponse = await getAllShowsByTheatre({theatreId:selectedTheatre._id});
      console.log('show response:',showResponse);
      
      if(showResponse.success){
        setShows(showResponse.allShows);
        console.log('inside shows:',shows);
      }
      else{
       message.error(movieResponse.message); 
      }

      dispatch(hideLoading());
    }
    catch(err){
      message.error(err.message);
      dispatch(hideLoading());

    }
  }

async function deleteHandler(showId){
  try{
    dispatch(showLoading());
    const response = await deleteShows({showId:showId});
    // console.log('delete response:', response)
    if(response.success){
      message.success(response.message);
      getData();
    }
    else{
      message.error(response.message);
    }
    dispatch(hideLoading());
  }
  catch(err){
    dispatch(hideLoading());
    message.error(err);
  }
}
  function closeHandler(){
    setIsShowModelOpen(false);
  }

  const onFinish = async (values)=>{
    try{
      // console.log('Inside onFinish');
      
      dispatch(showLoading());
      let response = null;
      if(view==='form'){
      // console.log('Inside onForm');
      // console.log('selected theatre:', selectedTheatre);
      response = await addShow({...values,theatre:selectedTheatre._id});
      // console.log('response:', response);

      }
      else{
        console.log('values', values);
        
        response = await updateShow(
          {
          ...values,showId: selectedShow._id, 
          theatre:selectedTheatre._id, 
          movies: values.movies
        });
      }
      if(response.success){
        getData();
        message.success(response.message);
        setView("table");
      }
      else {
       message.error(response.message);
      }
      dispatch(hideLoading());
      } catch (err) {
        console.log('error:', err);
        message.error(err.message);
        dispatch(hideLoading());
      }

  }
  const columns = [
    {
      title: "Show Name",
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: "Show Date",
      dataIndex: 'date',
      render: (text, data) => {
        return (new Date(text)).toISOString().split('T')[0]
      }
    },
    {
      title: "Show Time",
      dataIndex: 'time',
      
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render:(text,data)=>{
        return data.movies.movieName
      }
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render:(text,data)=>{
        return (
          <>
            <div>
              <Button onClick={()=>{
                setView('edit')
                setSelectedMovie(data.movies)
                // { console.log("selected movie",selectedMovie)}
                setSelectedShow({...data,date: (new Date()).toISOString().split('T')[0],})}} > <EditOutlined/> </Button>
          
            </div>
            {/* {console.log('sele',data)} */}
            
            <div>
              <Button onClick={()=>{deleteHandler(data._id)}}> <DeleteOutlined/> </Button>
            </div>
          </>
          
        )
      }
    }

]

useEffect(()=>{
  getData();
},[])

// console.log('movies for shows:', shows);

  return (
    <div className='flex justify-between'>
        <Modal 
      open={isShowModelOpen}
      onCancel={closeHandler}
      footer={null}
      width={1000}
    >
      <div>
        <h2 className='font-bold'>
          {view === 'table' ? "SHOWS" : "ADD SHOW"}
        </h2>
        {view === 'table' && <Table columns={columns} dataSource={shows}/>}

        {view === 'table' && (<Button type='primary' block onClick={()=>{
          setView('form');
        }}>ADD SHOW</Button>)}
      </div>
      <div>
      {
        (view === 'form' || view ==='edit') && (
        <Form layout='vertical' 
          style={{ width: "100%" }} 
          onFinish={onFinish} 
          initialValues={view === 'edit' ? {...selectedShow,movies:selectedMovie._id}:{}}>
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={8}>
                <Form.Item label="Show Name" name="name" htmlFor='name' rules={[{required:true, message:"Show Name is required"}]}>
                  <Input id='name' type='text' placeholder='Enter the show name'></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item  label='Show Date' name='date' htmlFor='date' rules={[{required:true, message:'Show date is required'}]}>
                  <Input id='date' type='date' placeholder='Enter the show date'></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item  label='Show Time' name='time' htmlFor='time' rules={[{required:true, message:'Show time is required'}]}>
                  <Input id='time' type='time' placeholder='Enter the show time'></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item label='Movie Name' htmlFor='movies' name='movies' rules={[{required: true, message: 'Movie name is required'}]}>
               <Select id='movie'
                placeholder='select movie' 
                
                options={movies.map((movie)=>({
                 key: movie._id,
                 value: movie._id,
                 label: movie.movieName
                }))}></Select>
            </Form.Item>
          </Col>
          <Col span={24}>
          <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
            <Col span={8}>
                <Form.Item label='Ticket Price' htmlFor='ticketPrice' name='ticketPrice' rules={[{required: true, message: 'Ticket price is required'}]}>
                  <Input id='ticketPrice' type='number' placeholder='Enter Ticket Price'></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Total seats' htmlFor='seatNumber' name='totalSeats' rules={[{required: true, message: 'Seat Number is required'}]}>
                  <Input id='seatNumber' type='number' placeholder='Enter number of seats'></Input>
                </Form.Item>
              </Col>
          </Row>   
          </Col>
        </Row>
        <div className='flex flex-col gap-4'>
          <Button type='primary' block onClick={()=>{setView('table')}} ><ArrowLeftOutlined/>GO BACK</Button>
          <Button type='primary' block onClick={onFinish} htmlType='submit'>
            {view === "form" ? "Add the Show" : "Edit the Show"}
          </Button>
        </div>
      </Form>
        ) 
      }
      </div>
      
      
    </Modal>
    </div>
  )
}

export default ShowModel