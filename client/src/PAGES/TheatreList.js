import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllTheatre, getTheatreByOwner } from '../api/theatre'
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { Button, message, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TheatreFormModel from './TheatreFormModel';
import DeleteModel from './DeleteModel';
import ShowModel from './ShowModel';

function TheatreList() {
    const dispatch = useDispatch();
    
    const {user} = useSelector((store)=>store.user )
    const [theatresOwnedByUser,setTheatresOwnedByUser] = useState([]);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [actionType,setActionType] = useState('add');
    const [selectedTheatre,setSelectedTheatre] = useState(null);
    const [isDeleteModelOpen,setDeleteModelOpen] = useState(false);
    const [isShowModelOpen, setIsShowModelOpen] = useState(false);
    
    const getData = async ()=>{  
        try{
            dispatch(showLoading());
            const response = await getTheatreByOwner({owner:user._id});
            if(response.success){
                const theatreList = response.theatre || [];
                setTheatresOwnedByUser(theatreList.map((item)=>{
                    return {...item, key:`theatre${item._id}`};
                }));
            }
            else{
                message.error(response.message);
            }
            dispatch(hideLoading());
        }
        catch(err){
            dispatch(hideLoading());
            message.error(err.message);
        }
        
    }
    
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            render: (isActive)=>{
                return isActive ? `Approved` : `Pending/Blocked`;
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text,data)=>{
                return(
                    <div>
                        <Button onClick={()=>{
                            setSelectedTheatre(data);
                            setActionType('edit');
                            setIsModalOpen(true);
                        }}>
                            <EditOutlined/>
                        </Button>
                        <Button onClick={()=>{
                            setDeleteModelOpen(true);
                            setSelectedTheatre(data);
                            setDeleteModelOpen(true);
                        }}>
                            <DeleteOutlined/>
                        </Button>
                        {
                            data.isActive && <Button onClick={()=>{
                                setIsShowModelOpen(true);
                                setSelectedTheatre(data);
                            }}>+ SHOWS</Button>
                        }
                    </div>
                )
            }
        }
    ]
    useEffect(()=>{
        getData();    
    },[])


  return (
    <>
        <div>
            <Button 
                className='bg-sky-950 font-mono text-white'
                onClick={()=>{
                    setIsModalOpen(true);
                    setActionType('add');
                }}
            >
                ADD THEATRE
            </Button>
        </div>
        <Table dataSource={theatresOwnedByUser} columns={columns}/>
        {isModalOpen && <TheatreFormModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} actionType={actionType} setActionType={setActionType} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre} getData={getData}/>}
        {isDeleteModelOpen && <DeleteModel isDeleteModelOpen={isDeleteModelOpen} setDeleteModelOpen={setDeleteModelOpen} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre} getData={getData}/>}
        {isShowModelOpen && <ShowModel isShowModelOpen={isShowModelOpen} setIsShowModelOpen={setIsShowModelOpen} selectedTheatre={selectedTheatre}/>}
    </>
  )
}

export default TheatreList