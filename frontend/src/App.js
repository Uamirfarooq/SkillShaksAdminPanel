
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/Pages/Admin/CreateCourse.jsx";
import Dashboard from "../src/Pages/Admin/Dashboard.jsx";
import Registration from "../src/Pages/Admin/Registration.jsx";
import CourseDetail from "../src/Pages/Admin/CourseDetail.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
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