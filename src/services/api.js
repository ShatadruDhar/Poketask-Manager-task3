// Mock data for development when backend is not available
const MOCK_TASKS = [
  {
    id: 1,
    title: 'Complete project setup',
    description: 'Set up the React frontend application with all necessary components and styling',
    dueDate: '2024-01-15',
    priority: 'high',
    completed: false,
  },
  {
    id: 2,
    title: 'Design user interface',
    description: 'Create wireframes and mockups for the task management interface',
    dueDate: '2024-01-20',
    priority: 'medium',
    completed: true,
  },
  {
    id: 3,
    title: 'Implement authentication',
    description: 'Add login and signup functionality with form validation',
    dueDate: '2024-01-25',
    priority: 'high',
    completed: false,
  },
];

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}`  }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}` , {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      // Fallback to mock data for development
      console.warn('API request failed, using mock data:', error.message);

      // Handle different endpoints with appropriate mock responses
      if (options.method === 'POST' && endpoint === '/tasks') {
        // Create new task
        const newTask = {
          id: Date.now(),
          ...JSON.parse(options.body),
          completed: false,
        };
        MOCK_TASKS.push(newTask);
        return newTask;
      }

      if (options.method === 'PUT' && endpoint.startsWith('/tasks/')) {
        // Update task
        const taskId = parseInt(endpoint.split('/')[2]);
        const updatedData = JSON.parse(options.body);
        const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          MOCK_TASKS[taskIndex] = { ...MOCK_TASKS[taskIndex], ...updatedData };
          return MOCK_TASKS[taskIndex];
        }
      }

      if (options.method === 'DELETE' && endpoint.startsWith('/tasks/')) {
        // Delete task
        const taskId = parseInt(endpoint.split('/')[2]);
        const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          const deletedTask = MOCK_TASKS.splice(taskIndex, 1)[0];
          return deletedTask;
        }
      }

      return mockData[endpoint] || [];
    }
  },

  auth: {
    login: (credentials) => api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    signup: (userData) => api.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  },

  tasks: {
    getAll: () => api.request('/tasks'),
    create: (taskData) => api.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),
    update: (id, taskData) => api.request(`/tasks/${id}` , {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),
    delete: (id) => api.request(`/tasks/${id}` , {
      method: 'DELETE',
    }),
  },
};

// Mock data responses
const mockData = {
  '/tasks': MOCK_TASKS,
  '/auth/login': {
    user: { id: 1, name: 'Demo User', email: 'demo@example.com' },
    token: 'demo-token-12345'
  },
  '/auth/signup': {
    user: { id: 1, name: 'Demo User', email: 'demo@example.com' },
    token: 'demo-token-12345'
  },
};

export default api;
