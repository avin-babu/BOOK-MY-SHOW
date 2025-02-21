import React from 'react'
import { useState } from 'react';
import { Button, Form, Row,Col,Input, Select, Modal, message } from 'antd'
import { addMovie, updateMovie } from '../api/movies';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../REDUX/loaderSlice';

function MovieForm({modelType, isModelOpen,setIsModelOpen,selectMovie,setSelectMovie,getData}) {
    // const [isModalOpen, setIsModalOpen] = useState(true);
    const dispatch = useDispatch();

    if(selectMovie){
      selectMovie.releaseDate = new Date(selectMovie.releaseDate).toISOString().split('T')[0]
    }
  
    const handleCancel = () => {
        setIsModelOpen(false);
        setSelectMovie(null);
    };

    const onFinish = async (values) =>{
      try{
        dispatch(showLoading());
        setIsModelOpen(false);
        let response = null;
        console.log(modelType)
        if(modelType==='Add'){
          // console.log('in');
          response = await addMovie(values);
          // console.log(response);
          
        }
        else{
          // console.log(selectMovie._id);
          response = await updateMovie({...values,movieId:selectMovie._id});  
        }

        if(response.success){
          message.success(response.message);
          getData();
        }
        else{
          message.error(response.message);
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
        <Modal 
          centered 
          title={modelType === 'Add' ? "Add Movie" : "Edit Movie"}  
          open={{isModelOpen}}
          footer={null}
          onCancel={handleCancel}>
          <Form layout='vertical' initialValues={selectMovie} onFinish={onFinish}>
              <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                <Col span={24}>
                  <Form.Item name="movieName" label="Movie Name" rules={[{required: true, message:"Movie Name is required!"}]}> 
                    <Input placeholder='enter the movie name'/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="description" label="Description" rules={[{required: true, message:"Description is required!"}]}> 
                    <Input placeholder='enter the Description'/>
                  </Form.Item>
                </Col>
                <Col span={26}>
                <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                  <Col span={10}>
                    <Form.Item label="Movie Duration (in min)" name="duration" rules={[{ required: true, message: "Movie duration is required!" }]}>
                      <Input type="number" placeholder="Enter the movie duration" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="language" label="Languages" rules={[{required:true, message:"Language is required!"}]}>
                      <Select placeholder="Select the languae" options={[
                        {value: 'Hindi', label: 'Hindi'},
                        {value: 'Malayalam', label: 'Malayalam'},
                        {value: 'English', label: 'English'},
                        {value: 'Tamil', label: 'Tamil'},
                        {value: 'Telugu', label: 'Telugu'}
                      ]}/>    
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Release Date" name="releaseDate" rules={[{ required: true, message: "Movie Release Date is required!" }]}>
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                  <Col span={8}>
                    <Form.Item label="Select Movie Genre" name="genre" rules={[{ required: true, message: "Movie genre is required!" }]}>
                      <Select
                        placeholder="Select Movie"
                        options={[
                          { value: 'Action', label: 'Action' },
                          { value: 'Comedy', label: 'Comedy' },
                          { value: 'Horror', label: 'Horror' },
                          { value: 'Love', label: 'Love' },
                          { value: 'Patriot', label: 'Patriot' },
                          { value: 'Bhakti', label: 'Bhakti' },
                          { value: 'Thriller', label: 'Thriller' },
                          { value: 'Mystery', label: 'Mystery' },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item label="Poster URL" name="poster" rules={[{ required: true, message: "Movie Poster is required!" }]}>
                      <Input placeholder="Enter the poster URL" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              </Row>
                  <Form.Item>
                    <Button block type="primary" htmlType="submit">
                      ADD
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button block type="primary" htmlType="submit" onClick={handleCancel}>
                      CANCEL
                    </Button>
                  </Form.Item>
            </Form>
        </Modal>
      </>
    );
}

export default MovieForm