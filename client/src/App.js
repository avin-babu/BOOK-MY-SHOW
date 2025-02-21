import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './PAGES/HOME';
import Login from './PAGES/LOGIN';
import Register from './PAGES/REGISTER';
import {Provider} from 'react-redux';
import store from './REDUX/store';
import ProtectedRoute from './COMPONENTS/ProtectedRoute';
import Admin from './PAGES/ADMIN';
import Partner from './PAGES/Partner';
import SingleMoviePage from './PAGES/SingleMoviePage';
import SingleShow from './PAGES/SingleShow';
import Loader from './PAGES/Loader';
import ForgotPassword from './PAGES/ForgotPassword';


function App() {
  return (
    <Provider store={store}>
      <Loader/>
      <BrowserRouter>
        <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/home' element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route>
        <Route path='/partner' element={<ProtectedRoute><Partner/></ProtectedRoute>}></Route>
        <Route path='/movie/:id' element={<ProtectedRoute><SingleMoviePage/></ProtectedRoute>}></Route>
        <Route path='/book-show/:id' element={<ProtectedRoute><SingleShow/></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
