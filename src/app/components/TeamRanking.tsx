import React from 'react';
import { TeamRanking }  from '../types/cricket';
import Image from 'next/image';

interface TeamRankingProps {
  ranking: TeamRanking;
}

const TeamRanking: React.FC<TeamRankingProps> = ({ ranking }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold text-gray-700">{ranking.rank}</span>
        <div className="flex items-center space-x-2">
          <Image 
            src={ranking.flag} 
            alt={ranking.team} 
            width={24} 
            height={24} 
            className="w-6 h-6 object-contain"
          />
          <span className="font-medium">{ranking.team}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{ranking.rating}</p>
        <p className="text-sm text-gray-500">{ranking.point} pts</p>
      </div>
    </div>
  );
};

export default TeamRanking;