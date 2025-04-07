'use client';
import React from 'react';
import MatchCard from '../../components/MatchCard';
import { useLiveMatches } from '../../hooks/useCricketApi';

const LiveMatchesPage: React.FC = () => {
  const { matches, loading } = useLiveMatches();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Live Matches</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 h-48 animate-pulse"></div>
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard key={match.match_id} match={match} showFullDetails />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No live matches currently</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatchesPage;