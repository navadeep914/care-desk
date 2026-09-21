require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const patientsRouter = require('./routes/patients');
const queueRouter = require('./routes/queue');
const visitsRouter = require('./routes/visits');
const sensorRouter = require('./routes/sensor'); // exposes /api/enroll and /api/identify

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientsRouter);
app.use('/api/queue', queueRouter);
app.use('/api/visits', visitsRouter);
app.use('/api', sensorRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongoConnected: mongoose.connection.readyState === 1 });
});

// In production, serve the React app that `npm run build` produces.
// In development, run the client separately with `npm start` (port 3000)
// — its package.json "proxy" field forwards /api/* calls to this server.
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
    if (err) next();
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/caredesk';

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 6000 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CareDesk API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    console.error('Check MONGODB_URI in server/.env — see server/.env.example. Is MongoDB running?');
    process.exit(1);
  });
