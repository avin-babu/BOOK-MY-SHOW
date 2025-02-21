import React from 'react'
import { useSelector } from 'react-redux'
import store from '../REDUX/store'
import { Flex, Spin } from 'antd';

function Loader() {
    const {loading} = useSelector((store)=>store.loading);
    console.log('loader:',loading);
    // const contentStyle: React.CSSProperties = {
    //     padding: 50,
    //     background: 'rgba(0, 0, 0, 0.05)',
    //     borderRadius: 4,
    //   };
      
  const content = <div style={{padding:50, background:'rgba(0, 0, 0, 0.05)', borderRadius: 4}} />;
  return (
    loading&&<Flex justify='center' align='center' style={{minHeight:"100vh"}}>
        <Spin tip="Loading" size='large' >
            {content}
        </Spin>
    </Flex>
  )
}

export default Loader