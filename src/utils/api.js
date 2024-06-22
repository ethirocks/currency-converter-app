import axios from 'axios';

const API_URL = 'https://open.er-api.com/v6/latest/';

export const fetchExchangeRates = async (base = 'USD') => {
  try {
    const response = await axios.get(`${API_URL}${base}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const fetchHistoricalRates = async (base = 'USD') => {
  const historicalRates = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    try {
      const response = await axios.get(`https://open.er-api.com/v6/${base}/${dateStr}`);
      historicalRates.push({ date: dateStr, rates: response.data.rates });
    } catch (error) {
      console.error(`Error fetching historical rates for ${dateStr}:`, error);
    }
  }

  return historicalRates;
};
