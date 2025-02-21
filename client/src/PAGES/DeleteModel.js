import { message, Modal } from 'antd'
import React from 'react'
import { deleteTheatre } from '../api/theatre';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';

function DeleteModel({isDeleteModelOpen,setDeleteModelOpen,selectedTheatre,setSelectedTheatre,getData}) {
    const dispatch = useDispatch();

    const handleCancel = ()=>{
        setDeleteModelOpen(false);
    }
    const handleOk = async ()=>{
        try{
            dispatch(showLoading());
            const deleteResponse = await deleteTheatre(selectedTheatre);
            console.log('response from delete: ', selectedTheatre);
            setDeleteModelOpen(false);
            
            if(deleteResponse.success){
                dispatch(hideLoading());
                message.success(deleteResponse.message)
                setSelectedTheatre(null);
                getData();    
            }
            else{
                dispatch(hideLoading());
                message.error(deleteResponse.message)
                setSelectedTheatre(null);
            }
        }
        catch(err){
            dispatch(hideLoading());
            throw err;
        }
        
       
    }
  return (
    <Modal 
        centered
        open={isDeleteModelOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        >
            <h2 className='text-xl'>Do you want  to delete this Theatre?</h2>
    </Modal>
  )
}

export default DeleteModel