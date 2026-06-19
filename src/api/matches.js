const API_BASE_URL = "https://cricket-scores.jayanthbharadwajm.workers.dev";

export async function getMatches() {
  const response = await fetch(`${API_BASE_URL}/matches`);

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  const result = await response.json();

  return result.data;
}

export async function getMatchDetails(matchId) {
  const response = await fetch(`${API_BASE_URL}/matches/${matchId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch match details");
  }

  const result = await response.json();

  return result.data;
}
