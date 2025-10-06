import React, { useState, useEffect, useContext } from 'react';
import { Plus, Sparkles, Target, CheckCircle2, Clock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import Navbar from '../Layout/Navbar';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.tasks.getAll();
      setTasks(data);
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await api.tasks.create(taskData);
      setTasks([...tasks, newTask]);
      setShowAddModal(false);
    } catch (error) {
      alert('Failed to add task: ' + error.message);
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      const updatedTask = await api.tasks.update(editingTask.id, taskData);
      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);
    } catch (error) {
      alert('Failed to update task: ' + error.message);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await api.tasks.delete(deletingTask.id);
      setTasks(tasks.filter(t => t.id !== deletingTask.id));
      setDeletingTask(null);
    } catch (error) {
      alert('Failed to delete task: ' + error.message);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const updatedTask = await api.tasks.update(task.id, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
    } catch (error) {
      alert('Failed to update task status: ' + error.message);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-dark-900 dark:via-dark-800 dark:to-red-950">
      <Navbar onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pokémon Stats Header */}
        <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-red-200 dark:border-red-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                Your Pokémon Tasks
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Powered by your Pokémon team!</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg px-4 py-2 flex items-center space-x-2">
                <Target size={20} className="text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-600 dark:text-red-400">{totalCount} Total</span>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg px-4 py-2 flex items-center space-x-2">
                <CheckCircle2 size={20} className="text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-600 dark:text-red-400">{completedCount} Complete</span>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg px-4 py-2 flex items-center space-x-2">
                <Sparkles size={20} className="text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-600 dark:text-red-400">{completionRate}% Rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
              className="flex items-center space-x-2"
            >
              <span>📋 All</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">{totalCount}</span>
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'secondary'}
              onClick={() => setFilter('pending')}
              className="flex items-center space-x-2"
            >
              <Clock size={16} />
              <span>Pending</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">{tasks.filter(t => !t.completed).length}</span>
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'secondary'}
              onClick={() => setFilter('completed')}
              className="flex items-center space-x-2"
            >
              <CheckCircle2 size={16} />
              <span>Complete</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">{completedCount}</span>
            </Button>
          </div>

          <Button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800">
            <Plus size={20} className="inline mr-2" />
            Add New Task
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 dark:border-red-400"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your Pokémon tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-lg border-2 border-dashed border-red-300 dark:border-red-700">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
              {filter === 'all' ? 'No tasks yet! Time to start your Pokémon journey!' : `No ${filter} tasks.` }
            </p>
            <p className="text-gray-500 dark:text-gray-400">Click "Add New Task" to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="✨ Add New Pokémon Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        title="✏️ Edit Pokémon Task"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleEditTask}
          onCancel={() => setEditingTask(null)}
        />
      </Modal>

      <Modal
        isOpen={deletingTask !== null}
        onClose={() => setDeletingTask(null)}
        title="⚠️ Release Pokémon Task?"
      >
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Are you sure you want to delete "{deletingTask?.title}"? This Pokémon task will be released back to the wild!
          </p>
          <div className="flex space-x-3">
            <Button variant="danger" onClick={handleDeleteTask} className="flex-1">
              Release Task
            </Button>
            <Button variant="secondary" onClick={() => setDeletingTask(null)} className="flex-1">
              Keep Training
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
