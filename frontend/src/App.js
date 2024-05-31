import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/pages/Admin/CreateCourse.jsx";
import Dashboard from "../src/pages/Admin/Dashboard.jsx";
import Registration from "../src/pages/Admin/Registration.jsx";
import CourseDetail from "../src/pages/Admin/CourseDetail.jsx";
import AdminHomePage from "../src/pages/Admin/Home.jsx";
import Navbar from "./components/Admin/Navbar.jsx";
import Footer from "./components/Admin/Footer.jsx";
import AnalyticsPage from "./pages/Admin/Analytics.jsx";
import UserListPage from "./pages/Admin/UserListPage.jsx";
import UserProfilePage from "./pages/Admin/UserProfilePage.jsx";

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
