'use client';
import React from 'react';
import PlayerRanking from '../../components/PlayerRanking';
import TeamRanking from '../../components/TeamRanking';
import { usePlayerRankings, useTeamRankings } from '../../hooks/useCricketApi';

const RankingsPage: React.FC = () => {
  const { rankings: playerRankings, loading: playerLoading } = usePlayerRankings();
  const { rankings: teamRankings, loading: teamLoading } = useTeamRankings();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cricket Rankings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Player Rankings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Top Players</h2>
            {playerLoading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : playerRankings.length > 0 ? (
              <div className="space-y-4">
                {playerRankings.map((player) => (
                  <PlayerRanking key={player.player_id} player={player} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No player rankings available</p>
            )}
          </div>

          {/* Team Rankings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Team Rankings</h2>
            {teamLoading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : teamRankings.length > 0 ? (
              <div className="space-y-4">
                {teamRankings.map((team) => (
                  <TeamRanking key={team.team} ranking={team} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No team rankings available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingsPage;