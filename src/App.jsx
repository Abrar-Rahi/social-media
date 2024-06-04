
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/registration';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
       <Route path="/" element={< Registration/>}></Route>
    </Route>
  )
);


function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
