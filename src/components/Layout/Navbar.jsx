import React, { useState, useContext } from 'react';
import { Moon, Sun, LogOut, Menu, X, Zap, Brain, Cpu, Smartphone } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import Button from '../UI/Button';
import ProfileAvatar from './ProfileAvatar';

const Navbar = ({ onLogout }) => {
  const { user } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pokemonHelpers = [
    { icon: '🧠', name: 'Alakazam', color: 'bg-red-500/80', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png' },
    { icon: '🤖', name: 'Metagross', color: 'bg-red-600/80', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png' },
    { icon: '💻', name: 'Porygon-Z', color: 'bg-red-700/80', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/474.png' },
    { icon: '📱', name: 'Rotom', color: 'bg-red-800/80', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/479.png' },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 dark:from-dark-900 dark:via-dark-800 dark:to-red-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {pokemonHelpers.map((pokemon, index) => (
                <div key={index} className={`w-8 h-8 rounded-full ${pokemon.color} flex items-center justify-center border-2 border-white/50 overflow-hidden`}>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-sm" style={{ display: 'none' }}>
                    {pokemon.icon}
                  </span>
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              PokéTask Manager
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center space-x-3">
              <ProfileAvatar name={user?.name || 'Trainer'} />
              <span className="text-white font-medium">{user?.name || 'Trainer'}</span>
            </div>
            <Button variant="secondary" onClick={onLogout} className="bg-white/20 text-white hover:bg-white/30">
              <LogOut size={18} className="inline mr-2" />
              Logout
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/20 text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/20 text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center space-x-3">
              <ProfileAvatar name={user?.name || 'Trainer'} />
              <span className="text-gray-800 dark:text-gray-200 font-medium">{user?.name || 'Trainer'}</span>
            </div>
            <Button variant="secondary" onClick={onLogout} className="w-full">
              <LogOut size={18} className="inline mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
