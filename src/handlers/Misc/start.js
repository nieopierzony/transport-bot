'use strict';

const languageMenu = require('../../helpers/keyboards/language');
const { oneTime } = require('../../helpers/keyboards/start');
const send = require('../../helpers/send');
const Handler = require('../../structures/pieces/Handler');

module.exports = class extends Handler {
  constructor(...args) {
    super(...args, {
      name: 'start',
      types: ['command', 'action'],
    });
  }

  run(ctx) {
    // console.log(ctx.locations.sort((a, b) => b.fetchedAt.getTime() - a.fetchedAt.getTime()));
    console.log(ctx.locations.filter(i => Date.now() - i.fetchedAt.getTime() < 5 * 60 * 100));
    if (!ctx.user.isLanguageSet) {
      send(ctx, ctx.i18n.t('greeting.firstTime'), languageMenu);
    } else {
      send(ctx, ctx.i18n.t('greeting.other'), oneTime(ctx));
    }
  }
};
