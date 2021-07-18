'use strict';

const Markup = require('telegraf/markup');

exports.inline = ctx => Markup.inlineKeyboard([Markup.callbackButton(ctx.i18n.t('helloworld'), 'start')]);
exports.oneTime = ctx =>
  Markup.keyboard([[ctx.i18n.t('buttons.favorite')], ['🚌', '🚎', '🚋', '🚐']])
    .oneTime()
    .resize()
    .extra();
