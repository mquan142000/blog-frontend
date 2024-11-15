import './App.css'
import Product from './Components/Product/Product'
// import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'


import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import TopSect from './Components/TopSect/TopSect'
import Home from "./Components/Home/Home.jsx";
import Profile from "./Components/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/product',
    element: <div><Product/></div>
  },
  {
    path: '/topsect',
    element: <div><TopSect/></div>
  },
  {
    path: '/category',
    element: <div><Home/></div>
  },
  {
    path: '/profile',
    element: <div><Profile/></div>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
