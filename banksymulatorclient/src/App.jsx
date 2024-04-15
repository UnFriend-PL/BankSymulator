import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginComponent/Login";
import Register from "./Components/RegisterComponent/Register";
import Navbar from "./Components/NavbarComponent/Navbar";
import HomeModule from "./Modules/HomeModule/HomeModule";
import { NotificationProvider } from "./Providers/NotificationProvider/NotificationProvider";
import Notification from "./Components/NotificationComponent/Notification";
import { ProfileModule } from "./Modules/ProfileModule/ProfileModule";
import ApplicationModule from "./Modules/ApplicationModule/ApplicationlModule";
import { useAdminContext } from "./Providers/AdminProvider/AdminProvider";
import AdminSearch from "./Components/AdminSearchComponent/AdminSearch";
import { useEffect, useState } from "react";
import { getUserRole } from "./Services/TokenService";
import { useUserContext } from "./Providers/UserProvider/UserProvider";
import LoansModule from "./Modules/LoansModule/LoansModule";

function App() {
  const [userRole, setUserRole] = useState();
  const { getUser, setUserData } = useUserContext();
  const { setAdminData } = useAdminContext();

  useEffect(() => {
    const checkUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      if (role === "Admin") setAdminData(getUser());
    };
    checkUserRole();
  }, []);
  return (
    <Router id="root">
      <NotificationProvider>
        <Notification />
        <Navbar />
        {userRole == "Admin" && <AdminSearch />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeModule />} />
          <Route path="/profile" element={<ProfileModule />} />
          <Route path="/applications" element={<ApplicationModule />} />
          <Route path="/loans" element={<LoansModule />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
}

export default App;
