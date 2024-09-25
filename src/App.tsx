import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Admin from "./pages/admin/admin"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Master from "./pages/master/master";
import Client from "./pages/client/client";
import Help from "./components/help";
import Header from "./components/header";
import Tabs from "./components/tabs";
import NotConfirmed from "./pages/master/notConfirmed";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/header" element={<Header />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tabs" element={<Tabs />} />
        <Route path="/master" element={<Master />} />
        <Route path="/master/notConfirmed" element={<NotConfirmed />} />
        
        <Route path="/client" element={<Client />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
