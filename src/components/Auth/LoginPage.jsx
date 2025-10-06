import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { validateEmail } from '../../utils/validation';
import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginPage = ({ onSwitchToSignup }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required!';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format!';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const response = await api.auth.login(formData);
      login(response.user, response.token);
    } catch (error) {
      setApiError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 dark:from-dark-900 dark:via-dark-800 dark:to-red-950 p-4">
      <div className="bg-white/95 dark:bg-dark-800/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full border border-red-200 dark:border-red-800">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
            <img src="pokeball-photo-7.png" alt="" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
            Welcome Back, Trainer!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Ready to continue your Pokémon task journey?</p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red/10 dark:bg-red-900/30 border border-red/30 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span>{apiError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Trainer Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your trainer email..."
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password..."
          />

          <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-lg py-3" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              ' Login to Your Journey'
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <div className="text-gray-500 dark:text-gray-400 mb-4">New to Pokémon Tasks?</div>
          <button
            onClick={onSwitchToSignup}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 dark:from-red-600 dark:to-red-800 dark:hover:from-red-700 dark:hover:to-red-900 shadow-lg hover:shadow-xl"
          >
             Start Your Pokémon Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
