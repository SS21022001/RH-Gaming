# 🏆 Office Gaming Tournament Website

An internal **office tournament management platform** for organizing and managing competitive games like **Mortal Kombat** and **FIFA**.

The website allows players to register, view match schedules, track results, and see leaderboards, while admins can create tournaments, generate brackets, and manage scores.

---

## 🎮 Supported Games

- **Mortal Kombat** – 1v1 (Single Elimination)
- **FIFA** – 1v1 (Group Stage + Knockouts)

---

## 🚀 Features

### Player Features
- User registration & login
- Join tournaments
- View upcoming matches
- Match results & history
- Player statistics & leaderboard

### Admin Features
- Create and manage tournaments
- Add or remove players
- Generate match brackets
- Enter and update scores
- Control tournament status

---


---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript
- Bootstrap / Tailwind CSS
- (Optional) React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB (recommended)
- PostgreSQL (alternative)

### Hosting
- Frontend: Netlify / Vercel
- Backend: Render / Railway

---

## 📊 Data Models

### User
- `id`
- `name`
- `email`
- `role` (admin / player)

### Tournament
- `id`
- `name`
- `game` (Mortal Kombat / FIFA)
- `format`
- `status` (upcoming / ongoing / completed)

### Match
- `id`
- `tournament_id`
- `player1`
- `player2`
- `score1`
- `score2`
- `winner`
- `round`

### Leaderboard
- `player_id`
- `game`
- `wins`
- `losses`
- `points`

---

## 🧩 Tournament Formats

### Mortal Kombat
- 1v1 matches
- Single elimination
- Best of 3 rounds

### FIFA
- Group stage
- Top players advance to knockouts
- Fixed match duration

---

## 📅 Development Roadmap

### Phase 1 – MVP
- Player registration
- Tournament creation
- Match scheduling
- Manual score entry
- Bracket display

### Phase 2 – Enhancements
- Automatic bracket generation
- Player stats & history
- Mobile responsiveness
- Live match updates

### Phase 3 – Extras
- Character / team selection
- Trophy animations
- Email or Slack notifications
- Dark gaming UI

---

## 🧪 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/office-tournament.git
cd office-tournament


## 🗂️ Project Structure

