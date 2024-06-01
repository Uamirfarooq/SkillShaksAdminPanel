import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/Pages/Admin/CreateCourse.jsx";
import Dashboard from "../src/Pages/Admin/Dashboard.jsx";
import Registration from "../src/Pages/Admin/Registration.jsx";
import CourseDetail from "../src/Pages/Admin/CourseDetail.jsx";
import AdminHomePage from "../src/Pages/Admin/Home.jsx";
import Navbar from "./components/Admin/Navbar.jsx";
import Footer from "./components/Admin/Footer.jsx";
import AnalyticsPage from "./Pages/Admin/Analytics.jsx";
import UserListPage from "./Pages/Admin/UserListPage.jsx";
import UserProfilePage from "./Pages/Admin/UserProfilePage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/register" element={<Registration />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/addCourse" element={<CreateCourse />} />
          <Route path="/admin/courseDetail" element={<CourseDetail />} />
          <Route path="/admin/manage-user" element={<UserListPage />} />
          <Route path="/admin/user/:userId" element={<UserProfilePage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
