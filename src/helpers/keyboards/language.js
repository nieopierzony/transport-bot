'use strict';

const Markup = require('telegraf/markup');

module.exports = Markup.inlineKeyboard([
  Markup.callbackButton('🇷🇺 Русский', 'language::ru'),
  Markup.callbackButton('🇺🇦 Українська', 'language::uk'),
]).extra();
