import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Error404 from './Pages/Error404';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Pages/Dashboard/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={Dashboard} />}
        />
      </Routes>
    </div>
  );
}

export default App;
