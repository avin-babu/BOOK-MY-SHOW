import React from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom';
import {loginApi} from '../../api/users'


function Login() {

  const navigate = useNavigate();
  const loginHandler = async (value)=>{
    try{
      const response = await loginApi(value);
      // console.log('response:',response);
      
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.token);
        navigate('/')
      }
      else{
        message.error(response.message);
      }
    }
    catch(err){
      message.error(err);
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-yellow-100/20'>
      <div className=' px-12 pb-10 bg-white rounded-2xl shadow-xl'>
        <div className='flex justify-center '>
          
          <img src="https://brandlogos.net/wp-content/uploads/2022/10/bookmyshow-logo_brandlogos.net_rzqea.png" className='w-[150px] h-[150px]'/>
        </div>
        
        <Form onFinish={loginHandler}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' },{type:'email'}]}
          >
            <Input prefix={<MailOutlined/>} placeholder="Email"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined/>} placeholder="Password" type='password'/>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className='text-base'>
            Not a User?
            <Link to='/register' className='underline p-2 text-blue-700'>Register</Link>
          </div>
      </div>
    </div>
    
  )
}

export default Login