'use strict';

const languageMenu = require('../../../helpers/keyboards/language');
const send = require('../../../helpers/send');
const Handler = require('../../../structures/pieces/Handler');

module.exports = class extends Handler {
  constructor(...args) {
    super(...args, {
      name: 'language',
      types: ['command', 'action'],
    });
  }

  run(ctx) {
    send(ctx, ctx.i18n.t('languages.menu'), languageMenu);
  }
};
