import axios from 'axios';

const API_KEY = process.env.RAPIDAPI_KEY;
const BASE_URL = 'https://cricket-live-line1.p.rapidapi.com';
console.log(API_KEY);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'cricket-live-line1.p.rapidapi.com'
  }
});

export const getLiveMatches = async () => {
  try {
    const response = await apiClient.get('/matches/v1/live');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

export const getMatchDetails = async (matchId) => {
  try {
    const response = await apiClient.get(`/mcenter/v1/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};

export const getMatchScorecard = async (matchId) => {
  try {
    const response = await apiClient.get(`/mcenter/v1/${matchId}/scard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scorecard:', error);
    throw error;
  }
};