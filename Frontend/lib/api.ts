const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function getTournaments() {
  const res = await fetch(`${API_BASE}/api/tournaments`);
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  return res.json();
}

export async function getLeaderboard() {
  const res = await fetch(`${API_BASE}/api/matches/leaderboard/simple`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}

export async function createTournament(payload) {
  const res = await fetch(`${API_BASE}/api/tournaments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create tournament');
  return res.json();
}

export async function getPlayers() {
  const res = await fetch(`${API_BASE}/api/players`);
  if (!res.ok) throw new Error('Failed to fetch players');
  return res.json();
}
