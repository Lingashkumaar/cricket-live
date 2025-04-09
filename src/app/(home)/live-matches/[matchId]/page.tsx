'use client';
import React from 'react';
import { use } from 'react';
import { useMatchDetails } from '../../../hooks/useCricketApi';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface MatchDetailsPageProps {
  params: Promise<{
    matchId: string;
  }>;
}

const MatchDetailsPage: React.FC<MatchDetailsPageProps> = ({ params }) => {
  const { matchId } = use(params);
  const { match, loading } = useMatchDetails(Number(matchId));

  if (!loading && !match) {
    return notFound();
  }
  console.log(match);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse h-96"></div>
        ) : match ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{match.series}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  Number(match.match_status) === 0 ? 'bg-red-100 text-red-800' : 
                  Number(match.match_status) === 1 ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {Number(match.match_status) === 2
                      ? 'Live'
                      : Number(match.match_status) === 1
                      ? 'Upcoming'
                      : 'Completed'}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Image 
                    src={match.team_a_img} 
                    alt={match.team_a} 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-xl font-bold">{match.team_a_short}</span>
                </div>
                <div className="text-center">
                  {match.team_a_scores && (
                    <p className="text-2xl font-bold">{match.team_a_scores}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Image 
                    src={match.team_b_img} 
                    alt={match.team_b} 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-xl font-bold">{match.team_b_short}</span>
                </div>
                <div className="text-center">
                  {match.team_b_scores && (
                    <p className="text-2xl font-bold">{match.team_b_scores}</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-medium">{match.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-medium">{match.match_date} • {match.match_time}</p>
                  </div>
                  {match.toss && (
                    <div>
                      <p className="text-sm text-gray-600">Toss</p>
                      <p className="font-medium">{match.toss}</p>
                    </div>
                  )}
                  {match.result && (
                    <div>
                      <p className="text-sm text-gray-600">Result</p>
                      <p className="font-medium text-green-600">{match.result}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scorecard */}
            {match.scorecard && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Scorecard</h2>
                {Object.entries(match.scorecard).map(([inning, data]) => (
                  <div key={inning} className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Image 
                        src={data.team.flag} 
                        alt={data.team.name} 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 object-contain"
                      />
                      <h3 className="text-lg font-bold">{data.team.name} - {data.team.score}/{data.team.wicket} ({data.team.over})</h3>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Batting</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Batsman</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">R</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">B</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">4s</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">6s</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">SR</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {data.batsman.map((batsman, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900">{batsman.name}</div>
                                    {batsman.out_by && (
                                      <span className="ml-2 text-xs text-gray-500">({batsman.out_by})</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{batsman.run}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{batsman.ball}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{batsman.fours}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{batsman.sixes}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{batsman.strike_rate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Bowling</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bowler</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">O</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">M</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">R</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">W</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Econ</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {data.bolwer?.map((bowler, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{bowler.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{bowler.over}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{bowler.maiden}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{bowler.run}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{bowler.wicket}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-900">{bowler.economy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Playing XI */}
            {match.playing_xi && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Playing XI</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Image 
                        src={match.playing_xi.team_a.flag} 
                        alt={match.playing_xi.team_a.name} 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 object-contain"
                      />
                      <h3 className="text-lg font-bold">{match.playing_xi.team_a.name}</h3>
                    </div>
                    <ul className="space-y-2">
                      {match.playing_xi.team_a.player.map((player, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Image 
                            src={player.image} 
                            alt={player.name} 
                            width={32} 
                            height={32} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-xs text-gray-500">{player.play_role}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Image 
                        src={match.playing_xi.team_b.flag} 
                        alt={match.playing_xi.team_b.name} 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 object-contain"
                      />
                      <h3 className="text-lg font-bold">{match.playing_xi.team_b.name}</h3>
                    </div>
                    <ul className="space-y-2">
                      {match.playing_xi.team_b.player.map((player, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Image 
                            src={player.image} 
                            alt={player.name} 
                            width={32} 
                            height={32} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-xs text-gray-500">{player.play_role}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Match Commentary */}
{typeof match.commentary === 'object' && match.commentary !== null && (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-xl font-bold mb-4">Match Commentary</h2>
    
    {Object.entries(match.commentary).map(([inning, overs]) => (
      <div key={inning} className="mb-8">
        <h3 className="text-lg font-semibold mb-3 border-b pb-2">{inning}</h3>
        
        {/* Get all overs in reverse order (latest first) */}
        {Object.entries(overs)
          .sort((a, b) => parseFloat(b[0].split(' ')[0]) - parseFloat(a[0].split(' ')[0]))
          .map(([over, comments]) => (
            <div key={over} className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">{over}</h4>
              
              <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                {comments.map((comment, idx) => (
                  <div key={`${over}-${idx}`} className="commentary-item">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-500">
                        {comment.data.overs}
                      </span>
                      {comment.data.runs !== '0' && comment.data.runs !== '' && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          comment.data.runs === 'wd' || comment.data.runs === 'nb' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : comment.data.wicket 
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {comment.data.runs}
                          {comment.data.wicket && 'W'}
                        </span>
                      )}
                    </div>
                    
                    <p className="font-medium mt-1">{comment.data.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{comment.data.description}</p>
                    
                    {comment.data.wicket && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">
                        Wicket! {comment.data.wicket}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    ))}
  </div>
)}

            {/* Match Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Match Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {match.umpire && (
                  <div>
                    <p className="text-sm text-gray-600">Umpires</p>
                    <p className="font-medium">{match.umpire}</p>
                  </div>
                )}
                {match.referee && (
                  <div>
                    <p className="text-sm text-gray-600">Match Referee</p>
                    <p className="font-medium">{match.referee}</p>
                  </div>
                )}
                {match.venue_weather && (
                  <div>
                    <p className="text-sm text-gray-600">Weather</p>
                    <p className="font-medium">
                      {match.venue_weather.weather} • {match.venue_weather.temp_c}°C
                    </p>
                  </div>
                )}
                {match.venue_scoring_pattern && (
                  <div>
                    <p className="text-sm text-gray-600">Venue Scoring Pattern</p>
                    <p className="font-medium">
                      1st Innings Avg: {match.venue_scoring_pattern.first_avg_score} • 
                      2nd Innings Avg: {match.venue_scoring_pattern.second_avg_score}
                    </p>
                  </div>
                )}
                {match.head_to_head && (
                  <div>
                    <p className="text-sm text-gray-600">Head to Head</p>
                    <p className="font-medium">
                      {match.team_a_short}: {match.head_to_head.team_a_win_count} • 
                      {match.team_b_short}: {match.head_to_head.team_b_win_count}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MatchDetailsPage;