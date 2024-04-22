import { BrowserRouter, Routes,Route }from 'react-router-dom';
import Home from './components/home';
import Signup from './Registration/signup';
import Login from './Registration/login';

export default function App(){
    return(
        <BrowserRouter>
      
        <Routes>

            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login/>}></Route>


          


        </Routes>
     
        </BrowserRouter>
);
}


