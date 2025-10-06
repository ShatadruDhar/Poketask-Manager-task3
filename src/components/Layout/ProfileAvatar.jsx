import React from 'react';

const ProfileAvatar = ({ name }) => {
  // Pokémon avatar assignments based on name hash
  const pokemonAvatars = [
    { name: 'Alakazam', color: 'bg-purple-500', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png', type: 'psychic' },
    { name: 'Metagross', color: 'bg-blue-500', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png', type: 'steel' },
    { name: 'Porygon-Z', color: 'bg-red-500', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/474.png', type: 'normal' },
    { name: 'Rotom', color: 'bg-orange-500', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/479.png', type: 'electric' },
    { name: 'Pikachu', color: 'bg-yellow-500', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', type: 'electric' },
    { name: 'Charizard', color: 'bg-red-600', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', type: 'fire' },
    { name: 'Blastoise', color: 'bg-blue-600', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', type: 'water' },
    { name: 'Venusaur', color: 'bg-green-500', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', type: 'grass' },
  ];

  // Simple hash function to assign consistent Pokémon to users
  const getPokemonIndex = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % pokemonAvatars.length;
  };

  const pokemon = pokemonAvatars[getPokemonIndex(name)];

  return (
    <div className="relative">
      <div className={`w-10 h-10 rounded-full ${pokemon.color} flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden`}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center text-lg"
          style={{ display: 'none' }}
        >
          {pokemon.type === 'psychic' ? '🧠' :
           pokemon.type === 'steel' ? '🤖' :
           pokemon.type === 'normal' ? '💻' :
           pokemon.type === 'electric' ? '📱' :
           pokemon.type === 'fire' ? '🔥' :
           pokemon.type === 'water' ? '💧' :
           pokemon.type === 'grass' ? '🌱' : '⚡'}
        </span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-gray-300"></div>
    </div>
  );
};

export default ProfileAvatar;
