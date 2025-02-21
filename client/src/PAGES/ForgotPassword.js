import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import {InputOTP} from 'antd-input-otp'
import { key } from 'fontawesome';
import { LockOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons';
import { forgetPassword, otpChecker, resetPassword } from '../api/users';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';
import { useNavigate } from 'react-router';

function ForgotPassword() {
    const dispatch = useDispatch();
    const [otp,setOtp] = useState(null);
    const [email,setEmail] = useState(null);
    const [passwordForm,setPasswordForm] = useState(false);
    const navigate = useNavigate();

    const onFinishPassword = async (value)=>{
        try{
            if(value.password === value.confirmPassword){
                const passwordResponse = await resetPassword({otp:otp, password:value.password});
                console.log('PASSWORD RESPONSE:',passwordResponse);
                if(passwordResponse.success){
                    message.success(passwordResponse.message);
                    navigate('/login');
                }
                else{
                    message.error(passwordResponse.message);
                }
                setEmail(null);
                setOtp(null);
            }
            else{
                message.error("There is a mismatch in the password");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const onFinishEmail = async (value)=>{
        try{
            dispatch(showLoading());
            // console.log('email',value);
            
            const generateOtp = await forgetPassword({emailId: value.email});
            // console.log('Generate otp:',generateOtp);
            
            if(generateOtp.success){
                alert("Check your Mailbox");
                setEmail(value.email);
            }
            else{
                // console.log('otp error:', generateOtp.message);
                message.error(generateOtp.message);
            }
            dispatch(hideLoading())
        }
        catch(err){
            dispatch(hideLoading())
            console.log('Error while generating otp:', otp);
        }
    }

    const onFinishOTP =  async (value)=>{
        try{
            dispatch(showLoading());
            const otpValue = [...value.otp];
            const otpString = otpValue.join('');

            // OTP validating
            const otpValidatorResponse = await otpChecker({otp:otpString,emailId:email});
            console.log('otpValidatorResponse',otpValidatorResponse);
            if(otpValidatorResponse.success){
                setOtp(otpString);
                setPasswordForm(true);
                console.log('otp value:', otp);
            }
            else{
                message.error(otpValidatorResponse.message);
            }
            dispatch(hideLoading());
        }
        catch(err){
            dispatch(hideLoading());
            console.log(err);
        }
        
    }

    
  return (
    <>
        {!email && 
            <div className='flex justify-center items-center min-h-screen bg-yellow-100/20'>
                <Form onFinish={onFinishEmail}>
                    <Form.Item name='email' rules={[{type:email},{required:true}]}>
                        <Input placeholder='Enter your email address' prefix={<MailOutlined/>} 
                            className='border-b-red-700/80 border-y-0 border-x-0 border-b-2 '    
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" className='font-bold bg-red-700/80'>
                            Generate OTP
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        }
        {email && !passwordForm &&
            <div className='flex justify-center items-center min-h-screen bg-yellow-100/20'>
                <Form onFinish={onFinishOTP}>
                    <Form.Item name="otp">
                        <InputOTP inputType='numeric'/>
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit' className='bg-red-700/80'>SUBMIT</Button>
                    </Form.Item>
                </Form>
            </div>
        }
        {
            passwordForm && 
            <div className='flex flex-col justify-center items-center min-h-screen bg-yellow-100/20'>

                <div className='font-bold mb-10 '>RESET YOUR PASSWORD</div>
                <div >
                    <Form onFinish={onFinishPassword}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true}, {message: 'Please input your Password!' }]}
                        >
                            <Input prefix={<LockOutlined/>} placeholder="Password" type='password'/>
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true}, {message: 'Please input your Password!' }]}
                        >
                            <Input prefix={<LockOutlined/>} placeholder="Confirm Password" type='password'/>
                        </Form.Item>

                        <Form.Item>
                            <Button block type='primary' htmlType='submit' className='bg-red-700/80'>SUBMIT</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        }
    </>
    
    
  )
}

export default ForgotPassword;