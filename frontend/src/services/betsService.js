import axios from "axios";

const API_URL = "/api/bets";

const get = async (gameId) => {
  const response = await axios.get(`${API_URL}?game_id=${gameId}`);
  return response.data;
};

const create = async (newBet) => {
  const response = await axios.post(API_URL, newBet);
  return response.data;
};

const update = async (id, updatedBet) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedBet);
  return response.data;
};

export default { get, create, update };
