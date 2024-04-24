import { BrowserRouter, Routes,Route }from 'react-router-dom';
import Home from './components/home';
import Signup from './Registration/signup';
import Login from './Registration/login';
import Blog from './components/blogform';
import ViewBlog from './components/viewblog';

export default function App(){
    return(
        <BrowserRouter>
      
        <Routes>

            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/crtblog" element={<Blog/>}></Route>
            <Route path="/view" element={<ViewBlog/>}></Route>


          


        </Routes>
     
        </BrowserRouter>
);
}


