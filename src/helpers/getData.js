'use strict';

const axios = require('axios');

const { API_URL } = process.env;

module.exports = async bot => {
  bot.context.routes = await axios.get(`${API_URL}/route/list`);
  bot.context.vehicles = await axios.get(`${API_URL}/vehicle/list`);
  bot.context.stops = await axios.get(`${API_URL}/stop/list`);
};
