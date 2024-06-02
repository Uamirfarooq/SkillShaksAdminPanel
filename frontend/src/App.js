import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "./Pages/Admin/CreateCourse.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Registration from "./Pages/Admin/Registration.jsx";
import CourseDetail from "./Pages/Admin/CourseDetail.jsx";

import Navbar from "./components/Admin/Navbar.jsx";
import Footer from "./components/Admin/Footer.jsx";
import AnalyticsPage from "./Pages/Admin/Analytics.jsx";
import UserListPage from "./Pages/Admin/UserListPage.jsx";
import UserProfilePage from "./Pages/Admin/UserProfilePage.jsx";
import AdminHomePage from "./Pages/Admin/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.js";
import NotFoundPage from "./Pages/Admin/NotFoundPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/admin/register" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/addCourse" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
          <Route path="/admin/courseDetail" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
          <Route path="/admin/manage-user" element={<ProtectedRoute><UserListPage /></ProtectedRoute>} />
          <Route path="/admin/user/:userId" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
