'use strict';

const axios = require('axios');
const Markup = require('telegraf/markup');
const { Transport } = require('../../helpers/enums');
const send = require('../../helpers/send');
const Handler = require('../../structures/pieces/Handler');

const { API_URL } = process.env;
const chunk = (a, n) => [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

module.exports = class extends Handler {
  constructor(...args) {
    super(...args, {
      name: /^[🚌|🚎|🚋|🚐|select(?:::(\w+))(?:::(\w+))]$/u,
      types: ['hears', 'action'],
    });
  }

  async run(ctx) {
    const routeType =
      ctx.match[1] ??
      {
        '🚌': Transport.Bus,
        '🚎': Transport.Trolleybus,
        '🚋': Transport.Tram,
        '🚐': Transport.Minibus,
      }[ctx.message.text];
    const page = ctx.match ? ctx.match[2] ?? 0 : 0;

    try {
      const req = await axios.get(`${API_URL}/route/list`);
      const isSuccess = req?.status === 200 && req.data;
      if (!isSuccess) throw new Error('NOT_SUCCESS_REQ');

      const routes = req.data
        .filter(i => i.type === routeType)
        .sort((a, b) => (+a.number > +b.number ? 1 : +b.number > +a.number ? -1 : 0))
        .slice(8 * page, 8 * page + 8);

      const markup = Markup.inlineKeyboard([
        ...chunk(
          routes.map(r => r.number),
          4,
        ),
      ]).extra();

      send(ctx, ctx.i18n.t(`menus.select.${routeType}`));
    } catch (err) {
      console.error(err);
    }
  }
};
