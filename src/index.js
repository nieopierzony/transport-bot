/* eslint-disable capitalized-comments */
'use strict';

require('dotenv').config();

const connectDatabase = require('./helpers/connectDatabase');
const connectWebsocket = require('./helpers/connectWebsocket');
const getData = require('./helpers/getData');
const Client = require('./structures/Client');

const { BOT_TOKEN } = process.env;
const bot = new Client(BOT_TOKEN);

connectDatabase(err => {
  if (err) throw err;
  console.log('[Database] База данных Mongo успешно подключена.');
});

connectWebsocket(bot);
getData(bot);

module.exports = bot;

const Map = require('./structures/Map');
const map = new Map().setTransType(4);
console.log(map);
