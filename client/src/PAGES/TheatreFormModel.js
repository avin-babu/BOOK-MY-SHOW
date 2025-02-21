import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { addTheatre,updateTheatre } from '../api/theatre';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';

function TheatreFormModel({isModalOpen, setIsModalOpen, actionType, setActionType,selectedTheatre,setSelectedTheatre,getData}) {
    const {user} = useSelector((store)=>store.user );
    const dispatch = useDispatch();
    
    const handleCancel = ()=>{
        setIsModalOpen(false);
        setSelectedTheatre(null);
    }

    const okHandler = async (value)=>{
        dispatch(showLoading());
        try{
            setIsModalOpen(false);
            if(actionType==='add'){
                const addResponse = await addTheatre({...value,owner:user._id});
                if(addResponse.success){
                    dispatch(hideLoading());
                    getData();
                    message.success(addResponse.message);
                }
                else{
                    dispatch(hideLoading());
                    message.error(addResponse.message);
                }
            }
            else{
                const editResponse = await updateTheatre({...value,theatreId:selectedTheatre._id});
                if(editResponse.success){
                    dispatch(hideLoading());
                    getData();
                    message.success(editResponse.message);
                }
                else{
                    dispatch(hideLoading());
                    message.error(editResponse.message);
                }
                setSelectedTheatre(null);
            }
        }
        catch(err){
            dispatch(hideLoading());
            message.error(err);
        }
        
    }
  return (
    <Modal
        centered
        title={actionType === 'add' ? 'Add Theatre' : 'Edit Theatre'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
    >
        <Form 
            layout='vertical'
            initialValues={selectedTheatre}
            onFinish={okHandler}
        >
            <Row gutter={{xs: 6,sm: 10,md: 12,lg: 16}}>
                <Col span={24}>
                    <Form.Item label="Theatre Name" htmlFor='name' name='name' 
                        rules={[{
                            required: true,
                            message : "Theatre Name  is required!"
                        }]}
                    >
                        <Input id='name' type='text' placeholder='Enter the Theatre name'></Input>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Address" htmlFor='address' name='address' 
                        rules={[{
                            required: true,
                            message : "Address  is required!"
                        }]}
                    >
                        <TextArea id='address' rows='3' type='text' placeholder='Enter the address'></TextArea>
                    </Form.Item>
                </Col>
                <Col span={24}>
                        <Row gutter={{
                            xs: 6,
                            sm: 10,
                            md: 12,
                            lg: 16,
                        }}>
                            <Col span={12}>
                                <Form.Item label="Email" htmlFor='email' name="email" rules={[{ required: true, message: "Email  is required!" }]}>
                                    <Input id="email" type="email" placeholder='Enter the email'></Input>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone Number" htmlFor='phone' name="phone"  rules={[{ required: true, message: "Phone number is required!" }]}>
                                    <Input id="phone" type="number" placeholder='Enter the phone number'></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                <Col span={24}>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit'>SUBMIT</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>
  )
}

export default TheatreFormModel