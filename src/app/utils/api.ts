import axios from 'axios';

const API_BASE_URL = 'https://cricket-live-line1.p.rapidapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-rapidAPI-key': process.env.RAPIDAPI_KEY,
    'X-rapidAPI-host': 'cricket-live-line1.p.rapidapi.com'
  }
});


export const getLiveMatches = async () => {
  try {
    const response = await api.get('/liveMatches');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};

export const getMatchScorecard = async (matchId: number) => {
  try {
    const response = await api.get(`/match/${matchId}/scorecard`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching match scorecard:', error);
    return null;
  }
};

export const getMatchCommentary = async (matchId: number) => {
  try {
    const response = await api.get(`/match/${matchId}/commentary`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching match commentary:', error);
    return null;
  }
};

export const getUpcomingMatches = async () => {
  try {
    const response = await api.get('/upcomingMatches');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return [];
  }
};

export const getRecentMatches = async () => {
  try {
    const response = await api.get('/recentMatches');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    return [];
  }
};

export const getMatchDetails = async (matchId: number) => {
  try {
    const response = await api.get(`/match/${matchId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    return null;
  }
};

export const getSeriesList = async () => {
  try {
    const response = await api.get('/series');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching series list:', error);
    return [];
  }
};

export const getSeriesDetails = async (seriesId: number) => {
  try {
    const response = await api.get(`/series/${seriesId}/squads`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching series details:', error);
    return null;
  }
};

export const getPlayerRankings = async () => {
  try {
    const response = await api.get('/playerRanking/1');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching player rankings:', error);
    return [];
  }
};

export const getTeamRankings = async () => {
  try {
    const response = await api.get('/teamRanking/1');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching team rankings:', error);
    return [];
  }
};