'use client';
import { useEffect } from 'react';

export default function ScoreCard({ match, scorecard }) {
  if (!match) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        Select a match to view details
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}
        </h2>
        <p className="text-gray-600 text-sm mb-1">
          {match.matchInfo.seriesName} • {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}
        </p>
        <p className="text-gray-600 text-sm">
          {match.matchInfo.matchDesc} • {match.matchInfo.matchFormat}
        </p>
      </div>

      {scorecard?.scoreCard?.map((inning, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            {inning.inningHeader}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batsman</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">B</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">4s</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">6s</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inning.batTeamDetails.batsmenData.map((batsman, idx) => (
                  <tr key={idx} className={batsman.isOut ? 'bg-red-50' : ''}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {batsman.batName}
                      {batsman.isOut && <span className="text-xs text-gray-500 ml-1">(out)</span>}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batsman.runs}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batsman.balls}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batsman.fours}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batsman.sixes}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batsman.strikeRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Bowling</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bowler</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">M</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inning.bowlTeamDetails.bowlersData.map((bowler, idx) => (
                      <tr key={idx}>
                        <td className="px-2 py-1 whitespace-nowrap text-xs font-medium text-gray-900">{bowler.bowlName}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">{bowler.overs}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">{bowler.maidens}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">{bowler.runs}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">{bowler.wickets}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">{bowler.economy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Extras</h4>
              <p className="text-sm text-gray-600">Total: {inning.extrasData.total}</p>
              <p className="text-sm text-gray-600">Byes: {inning.extrasData.byes}</p>
              <p className="text-sm text-gray-600">Leg Byes: {inning.extrasData.legByes}</p>
              <p className="text-sm text-gray-600">Wides: {inning.extrasData.wides}</p>
              <p className="text-sm text-gray-600">No Balls: {inning.extrasData.noballs}</p>
              <p className="text-sm text-gray-600">Penalty: {inning.extrasData.penalty}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Match Status</h3>
        <p className="text-blue-700">{match.matchInfo.status}</p>
      </div>
    </div>
  );
}