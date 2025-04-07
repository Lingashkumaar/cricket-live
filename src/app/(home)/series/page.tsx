'use client';
import React from 'react';
import SeriesCard from '../../components/SeriesCard';
import { useSeriesList } from '../../hooks/useCricketApi';

const SeriesPage: React.FC = () => {
  const { series, loading } = useSeriesList();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Current Series</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 h-64 animate-pulse"></div>
            ))}
          </div>
        ) : series.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((seriesItem) => (
              <SeriesCard key={seriesItem.series_id} series={seriesItem} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No current series available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesPage;