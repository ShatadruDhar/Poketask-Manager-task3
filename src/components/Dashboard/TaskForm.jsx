import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Task title is required!';
    if (!formData.description) newErrors.description = 'Task description is required!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-lg border border-red-200 dark:border-red-800">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {task ? 'Edit Your Pokémon Task' : 'Create New Pokémon Task'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {task ? 'Update your task details below!' : 'Add a new task to your Pokémon collection!'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Enter your task title..."
        />
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <span>Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
              errors.description ? 'border-red-500' : 'border-red-300 dark:border-red-700 hover:border-red-500 dark:hover:border-red-400 focus:border-red-500 dark:focus:border-red-400'
            } bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 resize-none`}
            rows="4"
            placeholder="Describe your task in detail..."
          />
          {errors.description && <p className="text-red text-sm mt-1">{errors.description}</p>}
        </div>
        <Input
          label="Due Date (Optional)"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <div className="mb-6">
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <span>Priority Level</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'low', label: 'Low', desc: 'Take it easy!' },
              { value: 'medium', label: 'Medium', desc: 'Standard pace' },
              { value: 'high', label: 'High', desc: 'Urgent!' }
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={formData.priority === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  formData.priority === option.value
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-25 dark:hover:bg-red-900/10'
                }`}>
                  <div className="font-bold text-lg">{option.label}</div>
                  <div className="text-sm opacity-75">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 pt-4">
          <Button type="submit" className="flex-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 dark:from-red-600 dark:to-red-800 dark:hover:from-red-700 dark:hover:to-red-900 text-lg py-3">
            {task ? '💾 Update Task' : '🚀 Create Task'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1 text-lg py-3">
            ❌ Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
