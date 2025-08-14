import axios from 'axios';

const FINNHUB_BASE = 'https://finnhub.io/api/v1';

export async function getStockCandles(symbol: string, from: number, to: number) {
  const res = await axios.get(`${FINNHUB_BASE}/stock/candle`, {
    params: {
      symbol,
      resolution: 'D',
      from,
      to,
      token: process.env.FINNHUB_API_KEY
    }
  });
  return res.data;
}

export async function getCompanyNews(symbol: string, from: string, to: string) {
  const res = await axios.get(`${FINNHUB_BASE}/company-news`, {
    params: { symbol, from, to, token: process.env.FINNHUB_API_KEY }
  });
  return res.data;
}
