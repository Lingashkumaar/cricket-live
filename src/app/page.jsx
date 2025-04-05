'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveMatches } from './store/scoreSlice';
import LiveMatches from './components/LiveMatches';
import ScoreCard from './components/ScoreCard';
import Navbar from './components/Navbar';
import Loading from './components/Loading';

export default function Home() {
  const dispatch = useDispatch();
  const { liveMatches, selectedMatch, scorecard, loading, error } = useSelector((state) => state.scores);

  useEffect(() => {
    dispatch(fetchLiveMatches());
  }, [dispatch]);

  if (loading && !liveMatches.length) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <LiveMatches matches={liveMatches} />
        </div>
        <div className="lg:col-span-2">
          <ScoreCard match={selectedMatch} scorecard={scorecard} />
        </div>
      </div>
    </div>
  );
}