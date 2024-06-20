import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../src/Pages/Admin/Dashboard.jsx";
import CourseDetail from "../src/Pages/Admin/CourseDetail.jsx";

import Navbar from "../src/components/Admin/Navbar.jsx";
import Footer from "../src/components/Admin/Footer.jsx";
import AnalyticsPage from "../src/Pages/Admin/Analytics.jsx";
import UserListPage from "../src/Pages/Admin/UserListPage.jsx";
import UserProfilePage from "../src/Pages/Admin/UserProfilePage.jsx";
import AdminHomePage from "../src/Pages/Admin/Home.jsx";
import ProtectedRoute from "../src/components/ProtectedRoutes.js";
import NotFoundPage from "../src/Pages/Admin/NotFoundPage.jsx";
import ForgetPass from "./Pages/Admin/ForgetPass.jsx";
import LoginPage from "./Pages/Admin/LoginPage.jsx";
import About from "./Pages/Admin/About.jsx";
import PrivacyPolicy from "./Pages/Admin/PrivacyPolicy.jsx";
import Licensing from "./Pages/Admin/Licensing.jsx";
import Contact from "./Pages/Admin/Contact.jsx";

function App() {
  return (
    <>
      <div className="bg-white select-none dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/admin/Login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/forget-password" element={<ForgetPass />} />

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
            <Route
              path="/admin/courseDetail/:id"
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-user"
              element={
                <ProtectedRoute>
                  <UserListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/PrivacyPolicy"
              element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/Licensing"
              element={
                <ProtectedRoute>
                  <Licensing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/Contact"
              element={
                <ProtectedRoute>
                  <Contact  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
