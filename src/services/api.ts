import axios from 'axios';
import type { Hotel, SearchParams } from '../types/hotel';

const BASE_URL = 'https://hotel-reccomendation.onrender.com';

export async function fetchRecommendations(params: SearchParams): Promise<Hotel[]> {
  const { data } = await axios.post<Hotel[]>(`${BASE_URL}/recommend`, {
    city: params.city,
    wifi: params.wifi ? 1 : 0,
    pool: params.pool ? 1 : 0,
    parking: params.parking ? 1 : 0,
    family_friendly: params.family_friendly ? 1 : 0,
    price: params.budget,
    rating: params.rating,
    luxury: params.luxury,
  });
  return typeof data === "string"
    ? JSON.parse(data)
    : data;
}
