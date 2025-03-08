import APISchema from '../controllers/schema.controller';
import FarmLogs from '../middleware/logs.middleware';
import { farm, session } from '../controllers/auth.controller';

// Load APISchema once during initialization
async function initializeFarm() {
  try {
    await session;
    APISchema(farm);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred during initialization:', error);
  }
}

// Call initializeFarm once at startup
initializeFarm();

export default function FarmLogsRoute() {
  const bodyParser = require('body-parser');
  const express = require('express');
  const middleware = express.Router();

  // Parse incoming requests with JSON payloads
  middleware.use(bodyParser.json());
  // Parse incoming requests with urlencoded payloads
  middleware.use(bodyParser.urlencoded({ extended: true }));

  // Middleware to handle farm initialization and updates
  middleware.use((req, res, next) => {
    req.farm = farm;
    next();
  });

  // Middleware to handle logs
  middleware.all('/logs', FarmLogs);
  middleware.id = 'farmlogs';
  return middleware;
}
