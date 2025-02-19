import FarmLogs from '../middleware/logs.middleware';

export default function FarmLogsRoute() {
  const bodyParser = require('body-parser');
  const express = require('express');
  const middleware = express.Router();
  // Parse incoming requests with JSON payloads
  middleware.use(bodyParser.json());

  // Parse incoming requests with urlencoded payloads
  middleware.use(bodyParser.urlencoded({ extended: true }));
  middleware.all('/logs', FarmLogs);
  middleware.id = 'farmlogs';
  return middleware;
}
