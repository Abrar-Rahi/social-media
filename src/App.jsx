
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
import FriendsPage from './pages/FriendsPage';
import 'swiper/css';
import PostPopup from './components/homeComponents/middlePart/PostPopup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={< LoggedInUser />}>
        <Route element={< RootLayout />}>
          <Route path="/" element={< Home />}></Route>
          <Route path="/friends" element={< FriendsPage/>}></Route>
        </Route>
      </Route>
      <Route element={<NotLogInUser />}>
        <Route path="/registration" element={< Registration />}></Route>
        <Route path="/login" element={< Login />}></Route>
      </Route>
    </Route>
  )
);


function App() {

  return (
    <>
      <PostPopup/>
      <RouterProvider router={router} />

    </>
  )

}


export default App
