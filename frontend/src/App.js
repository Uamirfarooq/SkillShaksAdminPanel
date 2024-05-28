
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "../src/Pages/Admin/CreateCourse";
import Dashboard from "../src/Pages/Admin/Dashboard";
import Registration from "../src/Pages/Admin/Registration";


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