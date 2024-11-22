import React from 'react'
import { LockOutlined, UserOutlined,MailOutlined } from '@ant-design/icons';
import { Button, Form, Input,message } from 'antd';
import { Link } from 'react-router-dom';
import {registerHanlder} from '../../api/users';

function Register() {
  const onFinishHandler = async (value)=>{
    try{
      const response = await registerHanlder(value);
      if(response.success){
        message.success(response.message);
      }
      else{
        message.error(response.message)
      }
    }
    catch(err){
      message.error(err);
    }
    
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-yellow-100/20'>
      <div className='px-14 pb-10 bg-white rounded-2xl shadow-xl'>
        <div className='flex justify-center'>
          <img src="https://brandlogos.net/wp-content/uploads/2022/10/bookmyshow-logo_brandlogos.net_rzqea.png" alt='logo' className='w-[150px] h-[150px]'/>
        </div>
        <div>
        <Form onFinish={onFinishHandler}>
        <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined/>} placeholder="Username"/>
            </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email ID!' },{type:'email'}]}
          >
            <Input prefix={<MailOutlined/>} placeholder="Email"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input prefix={<LockOutlined/>} placeholder="Password" type='password'/>
            </Form.Item>

            {/* <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input prefix={<LockOutlined/>} placeholder="Confirm password" type='password'/>
            </Form.Item> */}

            <Form.Item>
              <Button block type="primary" htmlType="submit" className='bg-green-500'>
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className='text-base pt-4'>
            Already a User?
            <Link to='/login' className='underline p-2 text-blue-700'>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register