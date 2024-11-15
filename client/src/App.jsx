import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'


import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import TopSect from './Components/TopSect/TopSect'
import Home from "./Components/Home/Home.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Settings from "./Components/Setting/Settings.jsx";

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
    path: '/home',
    element: <div><Home/></div>
  },
  {
    path: '/profile',
    element: <div><Profile/></div>
  },
  {
    path: '/settings',
    element: <div><Settings/></div>
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
