'use client';
import { useDispatch } from 'react-redux';
import { fetchMatchDetails, fetchScorecard } from '../store/scoreSlice';

export default function LiveMatches({ matches }) {
  const dispatch = useDispatch();

  const handleMatchSelect = (matchId) => {
    dispatch(fetchMatchDetails(matchId));
    dispatch(fetchScorecard(matchId));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Live Matches</h2>
      <div className="space-y-4">
        {matches?.typeMatches?.find(t => t.matchType === "International")?.seriesMatches?.flatMap(series => 
          series.seriesAdWrapper?.matches?.filter(match => match.matchInfo.matchStatus === "Live").map(match => (
            <div 
              key={match.matchInfo.matchId}
              onClick={() => handleMatchSelect(match.matchInfo.matchId)}
              className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">
                  {match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Live
                  
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {match.matchInfo.seriesName} • {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}
              </div>
              <div className="mt-2 text-sm">
                {match.matchInfo.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}