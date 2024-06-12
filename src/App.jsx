
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
import { ToastContainer } from 'react-toastify';
import NotLogInUser from './privateRoute/NotLogInUser';
import LoggedInUser from './privateRoute/LoggedInUser';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={< LoggedInUser />}>
        <Route path="/" element={< Home />}></Route>
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
      <RouterProvider router={router} />

    </>
  )

}


export default App
