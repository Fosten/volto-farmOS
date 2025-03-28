import FarmChoices from '../middleware/choices.middleware';

export default function FarmChoicesRoute() {
  const express = require('express');
  const middleware = express.Router();

  // Parse incoming requests with JSON payloads
  middleware.use(express.json({ limit: '1mb' }));
  // Parse incoming requests with urlencoded payloads
  middleware.use(express.urlencoded({ limit: '1mb', extended: true }));

  middleware.all('/choices', FarmChoices);
  middleware.id = 'farmchoices';
  return middleware;
}
