// admin/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import Applications from './pages/Applications';
import Banners from './pages/Banners';
import Occasions from './pages/Occasions';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/add" element={<AddJob />} />
          <Route path="/jobs/edit/:id" element={<EditJob />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/occasions" element={<Occasions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
