import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Setting/Settings';
import Sidemenu from './Components/Dashboard/Sidemenu';
import AppHeader from './Components/Dashboard/AppHeader';
import AppFooter from './Components/Dashboard/AppFooter';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Inventory from './Pages/Inventory';
import Orders from './Pages/Orders';
import Customers from './Pages/Customers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Các route ngoài Dashboard */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Route Dashboard với layout cố định */}
          <Route
            path="/dashboard/*"
            element={
              <div className="Dashboard">
                <AppHeader />
                <div className="SideMenuAndPageContent">
                  <Sidemenu />
                  <div className="PageContent">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/customers" element={<Customers />} />
                    </Routes>
                  </div>
                </div>
                <AppFooter />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
