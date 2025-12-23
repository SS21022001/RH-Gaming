# RH-Gaming — Backend (Express + SQLite)

Simple backend scaffold for the RH-Gaming frontend using MongoDB (Mongoose). Provides CRUD endpoints for players, tournaments and matches and a simple leaderboard endpoint.

Setup

1. Change to the backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Run in development mode (uses nodemon):

```bash
npm run dev
```

By default the server listens on port 4000. Health check: GET /api/health

MongoDB

Set `MONGODB_URI` in a `.env` file (example in `.env.example`). For local development you can run a local MongoDB server or use Docker:

```bash
# start a temporary MongoDB with Docker (optional)
docker run --rm -p 27017:27017 -e MONGO_INITDB_DATABASE=rh_gaming mongo:7
```

The server will wait for a successful DB connection before listening.

Routes

- GET /api/tournaments
- POST /api/tournaments
- GET /api/tournaments/:id
- PUT /api/tournaments/:id
- DELETE /api/tournaments/:id

- GET /api/players
- POST /api/players
- GET /api/players/:id
- PUT /api/players/:id
- DELETE /api/players/:id

- GET /api/matches?tourament_id=ID
- POST /api/matches
- GET /api/matches/:id
- PUT /api/matches/:id
- DELETE /api/matches/:id
- GET /api/matches/leaderboard/simple

Example: create a player

```bash
curl -X POST http://localhost:4000/api/players -H "Content-Type: application/json" -d '{"name":"Alice","tag":"alice#1"}'
```

Notes

- The DB file is `Backend/data.db` and will be created automatically.
- This is a minimal scaffold. If you want authentication, real migrations, or to use Postgres, I can add that next.
