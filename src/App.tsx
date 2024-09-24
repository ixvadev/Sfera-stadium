import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Admin from "./pages/admin"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
