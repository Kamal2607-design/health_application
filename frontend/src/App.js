import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';  // Assuming your registration form component is named like this
import LoginForm from './LoginForm'; 
import CheckInForm from './CheckInForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/checkin" element={<CheckInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
