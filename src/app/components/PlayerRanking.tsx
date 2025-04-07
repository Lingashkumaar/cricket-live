import React from 'react';
import { PlayerRanking } from '../types/cricket';
import Image from 'next/image';

interface PlayerRankingProps {
  player: PlayerRanking;
}

const PlayerRanking: React.FC<PlayerRankingProps> = ({ player }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold text-gray-700">{player.rank}</span>
        <div className="flex items-center space-x-3">
          <Image 
            src={player.img} 
            alt={player.name} 
            width={40} 
            height={40} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{player.name}</p>
            <p className="text-xs text-gray-500">{player.country}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{player.rating}</p>
      </div>
    </div>
  );
};

export default PlayerRanking;