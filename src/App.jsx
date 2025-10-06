import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const { user } = useContext(AuthContext);
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return showSignup ? (
      <SignupPage onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <LoginPage onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return <Dashboard />;
};

export default App;
