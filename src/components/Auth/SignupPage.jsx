import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { validateEmail, validatePassword } from '../../utils/validation';
import Input from '../UI/Input';
import Button from '../UI/Button';

const SignupPage = ({ onSwitchToLogin }) => {
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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
    if (!formData.name) newErrors.name = 'Trainer name is required!';
    if (!formData.email) {
      newErrors.email = 'Email is required!';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format!';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required!';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters!';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match!';
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
      const { confirmPassword, ...signupData } = formData;
      const response = await api.auth.signup(signupData);
      signup(response.user, response.token);
    } catch (error) {
      setApiError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-50 to-red-200 dark:from-dark-900 dark:via-dark-800 dark:to-red-950 p-4">
      <div className="bg-white/95 dark:bg-dark-800/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full border border-red-200 dark:border-red-800">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
            Join the Pokémon Task Force!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Become a legendary task trainer today!</p>
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
            label="Trainer Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter your trainer name..."
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email..."
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a password..."
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password..."
          />

          <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 dark:from-red-600 dark:to-red-800 dark:hover:from-red-700 dark:hover:to-red-900 text-lg py-3" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Trainer...</span>
              </div>
            ) : (
              '🚀 Start Your Journey!'
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <div className="text-gray-500 dark:text-gray-400 mb-4">Already a Pokémon Master?</div>
          <button
            onClick={onSwitchToLogin}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 dark:from-red-700 dark:to-red-900 dark:hover:from-red-800 dark:hover:to-red-950 shadow-lg hover:shadow-xl"
          >
            🔑 Login to Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
