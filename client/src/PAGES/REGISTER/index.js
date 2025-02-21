import React from 'react'
import { LockOutlined, UserOutlined,MailOutlined } from '@ant-design/icons';
import { Button, Form, Input,message, Radio, Flex  } from 'antd';
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
            label="Register as an Admin"
            name="isAdmin"
            rules={[{required: true, message: "you must choose anyone"}]}>
              <div className=''>
                <Radio.Group>
                  <Radio value={'admin'}>Yes</Radio>
                  <Radio value={'user'}>No</Radio>
                </Radio.Group>
              </div>

          </Form.Item>

          <Form.Item 
            label="Register as an Partner"
            name="isPartner"
            rules={[{required: true, message: "you must choose anyone"}]}>
              <div className=''>
                <Radio.Group>
                  <Radio value={'partner'}>Yes</Radio>
                  <Radio value={'user'}>No</Radio>
                </Radio.Group>
              </div>

          </Form.Item> */}

          <Form.Item 
            label="Register as "
            name="role"
          >
            <Flex vertical gap="middle" >
              <Radio.Group defaultValue="user" buttonStyle="solid" >
                <Radio.Button value="user">User</Radio.Button>
                <Radio.Button value="admin">Admin</Radio.Button>
                <Radio.Button value="partner">Partner</Radio.Button>
              </Radio.Group>
            </Flex>
          </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className='font-bold bg-red-700/80'>
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