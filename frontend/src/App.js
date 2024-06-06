import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/pages/Admin/CreateCourse.jsx";
import Dashboard from "../src/pages/Admin/Dashboard.jsx";
import Registration from "../src/pages/Admin/Registration.jsx";
import CourseDetail from "../src/pages/Admin/CourseDetail.jsx";

import Navbar from "../src/components/Navbar/Navbar.jsx";
import Footer from "../src/components/Admin/Footer.jsx";
import AnalyticsPage from "../src/pages/Admin/Analytics.jsx";
import UserListPage from "../src/pages/Admin/UserListPage.jsx";
import UserProfilePage from "../src/pages/Admin/UserProfilePage.jsx";
import AdminHomePage from "../src/pages/Admin/Home.jsx";
import ProtectedRoute from "../src/components/ProtectedRoutes.js";
import NotFoundPage from "../src/pages/Admin/NotFoundPage.jsx";

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
          {/* Update the route for CourseDetail to accept course ID as a parameter */}
          <Route path="/admin/courseDetail/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
          <Route path="/admin/manage-user" element={<ProtectedRoute><UserListPage /></ProtectedRoute>} />
          <Route path="/admin/user/:userId" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
