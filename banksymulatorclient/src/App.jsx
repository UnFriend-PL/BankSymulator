import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import Navbar from "./Components/NavbarComponent/Navbar";
import HomeModule from "./Modules/HomeModule/HomeModule";
function App() {
  return (
    <Router id="root">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomeModule />} />
      </Routes>
    </Router>
  );
}

export default App;
