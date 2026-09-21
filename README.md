# CareDesk — MERN Stack

MongoDB + Express + React + Node — frontend, backend, and database setup
all live together in this one project folder.

```
caredesk-mern/
  server/            Express API + Mongoose models (talks to MongoDB)
    models/
    routes/
    server.js
    .env.example
  client/            React app (the dashboard UI)
    public/
    src/
      pages/
  package.json       Root convenience scripts (run both together)
  README.md
```

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB database to connect to — either:
  - **Local**: install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and have it running (`mongod`), or
  - **Cloud**: a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster (no local install needed)

## 2. Install everything

From the `caredesk-mern` folder:

```bash
npm run install-all
```

This installs dependencies for both `server/` and `client/` in one go.
(Or install them separately: `cd server && npm install`, `cd client && npm install`.)

## 3. Configure the database connection

```bash
cd server
cp .env.example .env
```

Open `server/.env` and set `MONGODB_URI`:

- Local MongoDB (default, no changes needed):
  `mongodb://127.0.0.1:27017/caredesk`
- MongoDB Atlas: paste the connection string Atlas gives you under
  **Connect → Drivers**, and add `/caredesk` before the `?` as the database name:
  `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/caredesk`

You don't need to create any collections yourself — Mongoose creates
`patients`, `queue`, and `visits` automatically the first time each is
written to.

## 4. Run it

From the root `caredesk-mern` folder, one command runs both the API and
the dashboard together, with auto-reload on changes:

```bash
npm run dev
```

- API: http://localhost:5000
- Dashboard: http://localhost:3000 (opens automatically, and proxies its
  `/api/*` calls to the server on port 5000 — configured via `"proxy"`
  in `client/package.json`)

Open **http://localhost:3000** and sign in with any username/password —
this project has no real authentication system, it's a front-end login
screen for the clinical workflow, same as before.

## 5. Production build (one server, one port)

```bash
npm run build   # builds the React app into client/build
npm start       # builds (if needed) then serves everything from server on :5000
```

In production mode, `server.js` serves the built React app directly, so
only port 5000 is needed — no separate client server.

## 6. Connecting your real ESP32 + fingerprint sensor

Two routes exist specifically for your hardware, same shape as before:

- **`POST /api/enroll`** — call after the R307/AS608 sensor stores a new
  fingerprint template, to link it to a patient already registered here.
  ```json
  { "patient_id": "P1001", "template_id": 7 }
  ```
- **`POST /api/identify`** — call when the sensor matches a scanned
  thumb, to fetch that patient's record.
  ```json
  { "template_id": 7 }
  ```
  (Also accepts `{ "patient_id": "P1001" }` directly — that's what the
  dashboard's own Manual ID Lookup and demo scan control use.)

Both return the patient record as JSON, or a 404 if there's no match.
Point your ESP32's HTTP client at `http://<this-computer's-IP>:5000/api/enroll`
and `/api/identify`.

## 7. All API routes

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
| GET    | /api/health          | `{ status, mongoConnected }` — quick check   |

## 8. One honest limitation, unchanged from before

A browser still can't read a real USB/serial fingerprint sensor — so on
the **Scan Patient** and **Register Patient** pages, the actual thumb
scan is simulated in the UI (see the small "Demo control" dropdown).
Patient records, the queue, and consultations are all real and stored in
MongoDB. Once your ESP32 is calling `/api/enroll` / `/api/identify`
directly, it plugs into this exact same backend and database.

## 9. What was verified before this was handed to you

- `npm install` succeeds for both `server/` and `client/`
- Every server file passes a Node syntax check
- `server.js` boots and — if MongoDB isn't reachable — fails with a
  clear error instead of crashing silently
- `npm run build` in `client/` compiles the full React app with zero
  errors or warnings
- A full end-to-end run against a real MongoDB (patient creation, queue,
  fingerprint enroll/identify, and consultation save with automatic
  queue close-out) was verified against the equivalent Express routes in
  an earlier version of this backend

I couldn't spin up an actual MongoDB instance in the environment this was
built in to re-run that exact end-to-end pass on this MERN copy, so
after you run `npm run dev`, try registering a patient end-to-end and
let me know right away if anything doesn't work.
