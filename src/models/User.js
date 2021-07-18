'use strict';

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    isLanguageSet: { type: Boolean, default: false },
    isFirstRun: { type: Boolean, default: true },
    settings: {
      savedRoutes: [
        {
          name: { type: String, unique: true },
          route: { type: Number },
          stop: { type: Number },
        },
      ],
    },
  },
  {
    versionKey: false,
  },
);

UserSchema.statics.findOneOrCreate = async function findOneOrCreate(condition, doc) {
  return (await this.findOne(condition)) || this.create(doc);
};

module.exports = model('new-users', UserSchema);
