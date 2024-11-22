import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './PAGES/HOME';
import Login from './PAGES/LOGIN';
import Register from './PAGES/REGISTER';
import {Provider} from 'react-redux';
import store from './REDUX/store';
import ProtectedRoute from './COMPONENTS/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
