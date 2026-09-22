# CareDesk — Biometric Patient Identification System (IDS)

Express + React + Node — frontend, backend, and unified storage setup
all live together in this project.

```
caredesk/
  server/            Express API + Unified Store (File/Supabase)
    db/store.js      Database store interface
    routes/          REST API endpoints
    server.js        Express server entrypoint
    .env.example
  client/            React app (clinical dashboard UI)
    public/
    src/
      pages/
  package.json       Root convenience & deployment scripts
  README.md
```

## 1. Prerequisites

- Node.js 18+ and npm
- Zero external database installation required! CareDesk now uses an embedded persistent store (`server/data/db.json`) out of the box.

*(Optional)* If you wish to connect to **Supabase**, simply provide `SUPABASE_URL` and `SUPABASE_KEY` in `server/.env`.

## 2. Install everything

From the root project folder:

```bash
npm run install-all
```

This installs dependencies for both `server/` and `client/` in one go.

## 3. Configuration

```bash
cd server
cp .env.example .env
```

Settings in `server/.env`:
- `PORT=5000` (Default API port)
- `SUPABASE_KEY=...` (Optional, if syncing with Supabase)

## 4. Run Locally (Development)

From the root project folder:

```bash
npm run dev
```

- API: http://localhost:5000
- Dashboard: http://localhost:3000 (proxies `/api/*` calls to the server on port 5000)

Open **http://localhost:3000** and sign in with any username/password.

## 5. Production & Deployment (e.g. Render)

```bash
npm run build   # builds the React app into client/build
npm start       # serves everything from Express server on :5000 (or cloud $PORT)
```

Because `server.js` serves the built React app directly, deploying to Render requires only **one single web service**:
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

## 6. Hardware Integration (ESP32 + Fingerprint Sensor)

Two routes exist specifically for your hardware:

- **`POST /api/enroll`** — call after the R307/AS608 sensor stores a new
  fingerprint template, to link it to a patient already registered here:
  ```json
  { "patient_id": "P1001", "template_id": 7 }
  ```
- **`POST /api/identify`** — call when the sensor matches a scanned thumb:
  ```json
  { "template_id": 7 }
  ```
  *(Also accepts `{ "patient_id": "P1001" }` for manual ID lookup).*

## 7. API Reference

| Method | Path                 | Purpose                                     |
|--------|----------------------|----------------------------------------------|
| GET    | /api/patients        | List all patients                            |
| POST   | /api/patients        | Register a new patient (auto-generates ID)   |
| GET    | /api/patients/:id    | Get one patient                              |
| PATCH  | /api/patients/:id    | Update a patient (e.g. lab summary)          |
| POST   | /api/enroll          | Link a fingerprint template ID to a patient  |
| POST   | /api/identify        | Look up a patient by template ID or ID       |
| GET    | /api/queue           | List today's queue                           |
| POST   | /api/queue           | Add a patient to the queue                   |
| PATCH  | /api/queue/:id       | Update a queue entry's status                |
| GET    | /api/visits          | List consultation records                    |
| POST   | /api/visits          | Save a consultation (auto-closes queue entry)|
| GET    | /api/health          | `{ status, database }` health check          |
