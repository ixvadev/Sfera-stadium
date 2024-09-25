import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Admin from "./pages/admin"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Register from "./pages/auth/register";
import Master from "./pages/master";
import Client from "./pages/client";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/master" element={<Master />} />
        <Route path="/client" element={<Client />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
