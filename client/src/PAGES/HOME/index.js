import React, { useEffect } from 'react'
import { getCurrentUser } from '../../api/users';

function Home() {

useEffect(()=>{
  const fetchUser = async ()=>{
    const response = await getCurrentUser();
    console.log('response:',response);
  }
  fetchUser();
},[])
  return (
    <div>
      ATLAST YOU CAME  HERE!. 
      CONGRATS :-)
    </div>
  )
}

export default Home