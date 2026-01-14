import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

console.log("ADMIN backendUrl =", backendUrl);

const App = () => {

  // ✅ ADMIN TOKEN ONLY
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />

      {adminToken === ""
        ? <Login setAdminToken={setAdminToken} />
        : <>
            <Navbar setAdminToken={setAdminToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/orders' element={<Orders />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default App;
