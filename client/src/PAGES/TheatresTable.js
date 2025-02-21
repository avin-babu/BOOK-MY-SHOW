import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllTheatre, updateTheatre } from '../api/theatre'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { key } from 'fontawesome';

function TheatresTable() {
  const dispatch = useDispatch();
  const [allTheatres,setAllTheatres] = useState(null);
  const getData = async ()=>{
    try{
      dispatch(showLoading());
      const getResponse = await getAllTheatre();
      console.log('response  from theatre  table:',getResponse);
      const allTheatres = getResponse.theatres;
      if(getResponse.success){
        dispatch(hideLoading());
        setAllTheatres(allTheatres.map((theatre)=>{
          return {...theatre,key:`theatre${theatre._id}`};
        }));
      }else{
        dispatch(hideLoading());
      }
    }
    catch(err){
      throw  err;
    }
  }

  const updateActive = async (value)=>{
    try{
      dispatch(showLoading());
      value.isActive = !value.isActive;
      const updateResponse = await updateTheatre({...value,theatreId:value._id});

      if(updateResponse.success){
        dispatch(hideLoading());
        getData();
        if(value.isActive){
          message.success('Theatre is Activated!');
        }
        else{
          message.warning('Theatre is Blocked!');
        }
      } 
    }
    catch(err){
      dispatch(hideLoading());
      throw err;
    }
  }

  useEffect(()=>{
    getData();
  },[])
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
    },
    {
      title: 'PHONE NUMBER',
      dataIndex: 'phone',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
    },
    {
      title: 'OWNER',
      dataIndex: 'owner',
      render: (text,data)=>{
        return (
          <div>{data.owner && data.owner.userName}</div>
        )
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'isActive',
      render: (text,data)=>{
        // console.log('text:',text);
        // console.log('data:',data);
        return (
          <div>{text===true? 'Approved' : 'Pending/Blocked'}</div>
        )
      }
    },
    {
      title: 'Actions',
      render: (text,data)=>{
        return(
          <Button onClick={()=>{
            updateActive(data);
          }}>{data.isActive===false? 'Approved' : 'Blocked'}</Button>
        )
      }
    }
  ]
  return (
    <>
      <Table dataSource={allTheatres} columns={columns}/>
    </>
  )
}

export default TheatresTable