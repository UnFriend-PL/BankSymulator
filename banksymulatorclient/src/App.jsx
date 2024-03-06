import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import Navbar from "./Components/NavbarComponent/Navbar";
import HomeModule from "./Modules/HomeModule/HomeModule";
import { NotificationProvider } from "./Providers/NotificationProvider/NotificationProvider";
import Notification from "./Components/NotificationComponent/Notification";

function App() {
  return (
    <Router id="root">
      <NotificationProvider>
        <Notification />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeModule />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
}

export default App;
