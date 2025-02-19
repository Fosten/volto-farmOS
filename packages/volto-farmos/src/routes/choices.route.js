import FarmChoices from '../middleware/choices.middleware';

export default function FarmChoicesRoute() {
  const bodyParser = require('body-parser');
  const express = require('express');
  const middleware = express.Router();
  // Parse incoming requests with JSON payloads
  middleware.use(bodyParser.json());

  // Parse incoming requests with urlencoded payloads
  middleware.use(bodyParser.urlencoded({ extended: true }));
  middleware.all('/choices', FarmChoices);
  middleware.id = 'farmchoices';
  return middleware;
}
