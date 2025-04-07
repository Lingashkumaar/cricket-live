import React from 'react';
import { Match } from '../types/cricket';
import Image from 'next/image';
import Link from 'next/link';

interface MatchCardProps {
  match: Match;
  showFullDetails?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, showFullDetails = false }) => {
  const getMatchStatusColor = () => {
    if (match.match_status === 'Live') return 'bg-green-100 text-green-800';
    if (match.match_status === 'Upcoming') return 'bg-blue-100 text-blue-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getMatchStatusColor()}`}>
            {match.match_status}
          </span>
          <span className="text-xs text-gray-500">
            {match.match_date} • {match.match_time}
          </span>
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-500">{match.series}</h3>
          <h2 className="text-lg font-bold">{match.match_type || match.series}</h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Image 
              src={match.team_a_img} 
              alt={match.team_a} 
              width={24} 
              height={24} 
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium">{match.team_a_short}</span>
          </div>
          <div className="text-center">
            {match.team_a_scores && (
              <p className="font-bold">{match.team_a_scores}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Image 
              src={match.team_b_img} 
              alt={match.team_b} 
              width={24} 
              height={24} 
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium">{match.team_b_short}</span>
          </div>
          <div className="text-center">
            {match.team_b_scores && (
              <p className="font-bold">{match.team_b_scores}</p>
            )}
          </div>
        </div>

        {match.toss && (
          <p className="text-sm text-gray-600 mb-2">{match.toss}</p>
        )}

        {match.result && (
          <p className="text-sm font-medium text-green-600 mb-2">{match.result}</p>
        )}

        {match.need_run_ball && (
          <p className="text-sm font-medium text-red-600 mb-2">{match.need_run_ball}</p>
        )}

        {showFullDetails && (
          <Link 
          href={
            match.match_status === 'Live' ? `/live-matches/${match.match_id}` :
            match.match_status === 'Upcoming' ? `/upcoming/${match.match_id}` :
            `/completed/${match.match_id}`
          }
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View Full Details →
          </Link>
        )}
      </div>
    </div>
  );
};

export default MatchCard;