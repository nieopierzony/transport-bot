'use strict';

module.exports = async (ctx, content, markup) => {
  try {
    const hasPhoto = ctx.update?.callback_query?.message?.photo;
    if (ctx.message || hasPhoto) {
      if (hasPhoto) await ctx.editMessageReplyMarkup();
      await ctx.replyWithHTML(content, markup);
    } else {
      await ctx.answerCbQuery();
      await ctx.editMessageText(content, markup);
    }
  } catch (err) {
    if (err.message.includes('message is not modified')) return;
    console.error(err);
  }
};
