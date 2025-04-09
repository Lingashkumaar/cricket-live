'use client';
import { useEffect, useState } from 'react';
import * as api from '../utils/api';
import { Match, Series, PlayerRanking, TeamRanking, MatchDetails } from '../types/cricket';

export const useLiveMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const data = await api.getLiveMatches();
      setMatches(data);
      setLoading(false);
    };

    fetchMatches();
  }, []);

  return { matches, loading };
};

export const useUpcomingMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const data = await api.getUpcomingMatches();
      setMatches(data);
      setLoading(false);
    };

    fetchMatches();
  }, []);

  return { matches, loading };
};

export const useRecentMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const data = await api.getRecentMatches();
      setMatches(data);
      setLoading(false);
    };

    fetchMatches();
  }, []);

  return { matches, loading };
};



export const useSeriesList = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const data = await api.getSeriesList();
      setSeries(data);
      setLoading(false);
    };

    fetchSeries();
  }, []);

  return { series, loading };
};

export const useMatchDetails = (matchId: number) => {
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      setLoading(true);
      try {
        const [basicInfo, scorecard, playingXI, commentary] = await Promise.all([
          api.getMatchDetails(matchId),
          api.getMatchScorecard(matchId),
          api.getMatchPlayingXI(matchId),
          api.getMatchCommentary(matchId)
        ]);
        
        setMatch({
          ...basicInfo,
          scorecard: scorecard?.scorecard,
          playing_xi:playingXI,
          commentary: commentary
        });
      } catch (error) {
        console.error('Error fetching match details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  return { match, loading };
};

export const useSeriesDetails = (seriesId: number) => {
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const data = await api.getSeriesDetails(seriesId);
      setSeries(data);
      setLoading(false);
    };

    fetchSeries();
  }, [seriesId]);

  return { series, loading };
};

export const usePlayerRankings = () => {
  const [rankings, setRankings] = useState<PlayerRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      const data = await api.getPlayerRankings();
      setRankings(data);
      setLoading(false);
    };

    fetchRankings();
  }, []);

  return { rankings, loading };
};

export const useTeamRankings = () => {
  const [rankings, setRankings] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      const data = await api.getTeamRankings();
      setRankings(data);
      setLoading(false);
    };

    fetchRankings();
  }, []);

  return { rankings, loading };
};