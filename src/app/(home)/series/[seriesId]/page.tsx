'use client';
import React from 'react';
import { useSeriesDetails } from '../../../hooks/useCricketApi';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import MatchCard from '../../../components/MatchCard';
import { useLiveMatches, useUpcomingMatches, useRecentMatches } from '../../../hooks/useCricketApi';

interface SeriesDetailsPageProps {
  params: {
    seriesId: string;
  };
}

const SeriesDetailsPage: React.FC<SeriesDetailsPageProps> = ({ params }) => {
  const { series, loading } = useSeriesDetails(Number(params.seriesId));
  const { matches: liveMatches } = useLiveMatches();
  const { matches: upcomingMatches } = useUpcomingMatches();
  const { matches: recentMatches } = useRecentMatches();

  if (!loading && !series) {
    return notFound();
  }

  const seriesLiveMatches = liveMatches.filter(match => match.series_id === Number(params.seriesId));
  const seriesUpcomingMatches = upcomingMatches.filter(match => match.series_id === Number(params.seriesId));
  const seriesRecentMatches = recentMatches.filter(match => match.series_id === Number(params.seriesId));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse h-96 mb-8"></div>
        ) : series ? (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-48 w-full">
                <Image 
                  src={series.image} 
                  alt={series.series} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                      {series.series_type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {series.series_date}
                  </span>
                </div>

                <h1 className="text-3xl font-bold mb-2">{series.series}</h1>
                <p className="text-gray-600 mb-4">{series.total_matches} matches</p>
              </div>
            </div>

            {/* Live Matches */}
            {seriesLiveMatches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Live Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seriesLiveMatches.map((match) => (
                    <MatchCard key={match.match_id} match={match} showFullDetails />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Matches */}
            {seriesUpcomingMatches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Upcoming Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seriesUpcomingMatches.map((match) => (
                    <MatchCard key={match.match_id} match={match} showFullDetails />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Matches */}
            {seriesRecentMatches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Recent Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seriesRecentMatches.map((match) => (
                    <MatchCard key={match.match_id} match={match} showFullDetails />
                  ))}
                </div>
              </div>
            )}

            {seriesLiveMatches.length === 0 && seriesUpcomingMatches.length === 0 && seriesRecentMatches.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No matches available for this series</p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SeriesDetailsPage;