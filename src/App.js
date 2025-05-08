import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/ Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    // Wrap entire app with AuthProvider for global auth state
    <AuthProvider>
      <Router>
        <div className="app">
          {/* Persistent navigation bar */}
          <Navbar />
          
          {/* Main content area with route definitions */}
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;