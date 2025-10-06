import React from 'react';
import { Edit2, Trash2, Check } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const priorityStyles = {
    low: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-red-200 text-red-900 border-red-400',
    high: 'bg-red-300 text-red-900 border-red-500',
  };

  const priorityIcons = {
    low: '',
    medium: '',
    high: '',
  };

  return (
    <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={() => onToggleStatus(task)}
            className={`mt-1 w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              task.completed
                ? 'bg-red-600 border-red-600 text-white shadow-lg'
                : 'border-red-300 hover:border-red-500 bg-white dark:bg-dark-700 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            {task.completed && <Check size={20} className="text-white drop-shadow" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${priorityStyles[task.priority]}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              task.completed
                ? 'line-through text-gray-500 dark:text-black'
                : 'text-gray-800 dark:text-black'
            }`}>
              {task.title}
            </h3>
            <p className="text-gray-600 dark:text-black mb-4">
              {task.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className={`flex items-center space-x-1 ${
                task.completed ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'
              }`}>
                <span>{task.completed ? 'Complete!' : 'In Progress'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110"
            title="Edit Task"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110"
            title="Delete Task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mt-4">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            task.completed ? 'bg-red-600 dark:bg-red-400' : 'bg-red-400 dark:bg-red-600'
          }`}
          style={{ width: task.completed ? '100%' : '33%' }}
        ></div>
      </div>
    </div>
  );
};

export default TaskItem;
