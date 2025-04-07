'use client';
import React from 'react';
import MatchCard from '../components/MatchCard';
import SeriesCard from '../components/SeriesCard';
import { useLiveMatches, useUpcomingMatches, useRecentMatches, useSeriesList } from '../hooks/useCricketApi';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const { matches: liveMatches, loading: liveLoading } = useLiveMatches();
  const { matches: upcomingMatches, loading: upcomingLoading } = useUpcomingMatches();
  const { matches: recentMatches, loading: recentLoading } = useRecentMatches();
  const { series, loading: seriesLoading } = useSeriesList();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Live Matches Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Live Matches</h2>
            <Link href="/live-matches" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          {liveLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-48 animate-pulse"></div>
              ))}
            </div>
          ) : liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.match_id} match={match} showFullDetails />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No live matches currently</p>
            </div>
          )}
        </section>

        {/* Upcoming Matches Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Matches</h2>
            <Link href="/upcoming-matches" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          {upcomingLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-48 animate-pulse"></div>
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.match_id} match={match} showFullDetails />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No upcoming matches scheduled</p>
            </div>
          )}
        </section>

        {/* Completed Matches Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Matches</h2>
            <Link href="/completed-matches" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          {recentLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-48 animate-pulse"></div>
              ))}
            </div>
          ) : recentMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.match_id} match={match} showFullDetails />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No recent matches available</p>
            </div>
          )}
        </section>

        {/* Series Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Current Series</h2>
            <Link href="/series" className="text-blue-600 hover:text-blue-800">
              View All →
            </Link>
          </div>
          {seriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-64 animate-pulse"></div>
              ))}
            </div>
          ) : series.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {series.slice(0, 3).map((seriesItem) => (
                <SeriesCard key={seriesItem.series_id} series={seriesItem} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No current series available</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;