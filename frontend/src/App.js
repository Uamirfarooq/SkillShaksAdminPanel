// import Routes from './Routes/Routes';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './Redux/store';
import Registration from './pages/Admin/Registration';
import Dashboard from './pages/Admin/Dashboard';
import CreateCourse from './pages/Admin/CreateCourse';


function App() {
  return (
    <div>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/addCourse" element={<CreateCourse />} />
      </Routes>
      </BrowserRouter>
  </Provider>,
    </div>
  );
}

export default App;