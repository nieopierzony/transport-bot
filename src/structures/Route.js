'use strict';

module.exports = class Route {
  constructor(data = {}) {
    this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.type = 'type' in data ? data.type : null;
    this.number = 'number' in data ? data.number : null;
    this.info = 'info' in data ? data.info : null;
    this.path = 'path' in data ? data.path : null;
  }
};
