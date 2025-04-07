import React from 'react';
import { Series } from '../types/cricket';
import Image from 'next/image';
import Link from 'next/link';

interface SeriesCardProps {
  series: Series;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40">
        <Image 
          src={series.image} 
          alt={series.series} 
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">
              {series.series_type}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {series.series_date}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-2">{series.series}</h3>
        <p className="text-sm text-gray-600 mb-4">{series.total_matches} matches</p>

        <Link 
          href={`/series/${series.series_id}`}
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Series →
        </Link>
      </div>
    </div>
  );
};

export default SeriesCard;