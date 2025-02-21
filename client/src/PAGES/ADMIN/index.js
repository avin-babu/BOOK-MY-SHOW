import React from 'react'
import { Tabs } from 'antd';
import MovieList from '../MovieList';
import TheatresTable from '../TheatresTable';


function Admin() {
  const items = [
    {
      key: '1',
      label: 'Movies',
      children: <MovieList/>,
    },
    {
      key: '2',
      label: 'Theatres',
      children: <TheatresTable/>,
    },
  ];
  return (
    <Tabs items={items}/>
  )
}

export default Admin