
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/pages/Admin/CreateCourse.jsx";
import Dashboard from "../src/pages/Admin/Dashboard.jsx";
import Registration from "../src/pages/Admin/Registration.jsx";
import CourseDetail from "../src/pages/Admin/CourseDetail.jsx";
import AdminHomePage from "../src/pages/Admin/Home.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/admin/register" element={<Registration />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/addCourse" element={<CreateCourse />} />
        <Route path="/admin/courseDetail" element={<CourseDetail />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;