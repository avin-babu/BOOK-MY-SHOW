import React from 'react'
import { Tabs } from 'antd';
import TheatreList from './TheatreList';

function Partner() {
    const items = [
        {
          key: '1',
          label: 'Theatres',
          children: <TheatreList/>,
        },
      ];
      return (
        <>
            <h1 className='font-bold text-2xl'>Partner Page</h1>
            <Tabs items={items}/>
        </>
      )
}

export default Partner