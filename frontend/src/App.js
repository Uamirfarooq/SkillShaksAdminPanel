
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/pages/Admin/CreateCourse.jsx";
import Dashboard from "../src/pages/Admin/Dashboard.jsx";
import Registration from "../src/pages/Admin/Registration.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/admin/register" element={<Registration />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/addCourse" element={<CreateCourse />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;