import {store} from '../REDUX/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
    } from "@ant-design/icons";
import { Link,useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../REDUX/loaderSlice';
import { getCurrentUser } from '../api/users';
import { setUser } from '../REDUX/userSlice';
import { message,Layout,Menu } from 'antd';
    

function ProtectedRoute({children}) {
    const {user} = useSelector((state)=>state.user);
    console.log('user:', user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getValidUser();
        }
        else{
            navigate('/login');
        }
    },[])

    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlined/>
        },
        {
            label: `${user ? user.userName.split(" ")[0] : ""}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <span onClick={
                            ()=>{
                                if(user.role === 'admin'){
                                    navigate('/admin');
                                }
                                else if(user.role === 'partner'){
                                    navigate('/partner');
                                }
                                else{
                                    navigate('/profile');
                                }
                            }
                        }>
                            My Profile
                        </span>
                    ),
                    icon: <ProfileOutlined />,
                },
                {
                    label: (
                        <Link to='/login' onClick={()=>{
                            localStorage.removeItem('token');
                        }}>
                            Log Out
                        </Link>
                    ),
                    icon: <LogoutOutlined />,
                },
            ]
        }
    ]

    const getValidUser = async ()=>{
        try{
            dispatch(showLoading());
            const response = await getCurrentUser();
            console.log('response :',response.data);
            dispatch(setUser(response.data));
            dispatch(hideLoading());
        }
        catch(err){
            dispatch(setUser(null))
            message.error(err);
        }
        
    }

    const { Header, Footer, Sider, Content } = Layout;

    return (
        user && (
          <>
            <Layout>
              <Header
                className="d-flex justify-content-between"
                style={{
                  position: "sticky",
                  top: 0,
                  zIdnex: 1,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3 className="text-white m-0" style={{ color: "white" }}>
                  Book My Show
                </h3>
                <Menu items={navItems} theme="dark" mode="horizontal" className='justify-around'/>
              </Header>
              <div style={{ padding: 24, minHeight: "380", background: "#fff" }}>
                {children}
              </div>
            </Layout>
          </>
        )
      );
}

export default ProtectedRoute