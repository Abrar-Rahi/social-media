
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/registration';
import Home from './pages/home';
import Login from './pages/login';
import NotLogInUser from './privateRoute/NotLogInUser';
import LoggedInUser from './privateRoute/LoggedInUser';
import RootLayout from './components/RootLayout';
import 'swiper/css';
import ActivePage from './pages/home/ActivePage';
import ForgetPassword from './pages/forgetPassword';
import PostPopup from './components/homeComponents/middlePart/PostPopup';
import { useState } from 'react';
import { useGetAllPostQuery } from './features/api/authApi';




function App() {

  const [postVisible,setPostVisible] = useState(false)

  const {data : posts} = useGetAllPostQuery()
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={< LoggedInUser />}>
          <Route element={< RootLayout />}>
            <Route path="/" element={< Home setPostVisible={setPostVisible} posts={posts}/>}></Route>
            <Route path="/varification/:token" element={< ActivePage />}></Route>
          </Route>
        </Route>
        <Route element={<NotLogInUser />}>
          <Route path="/registration" element={< Registration />}></Route>
          <Route path="/login" element={< Login />}></Route>
        </Route>
        <Route path="/forgetPassword" element={< ForgetPassword />}></Route>
      </Route>
    )
  );
  return (
    <>
    {postVisible && <PostPopup setPostVisible={setPostVisible}/>}
      
      <RouterProvider router={router} />

    </>
  )

}


export default App
