'use strict';

module.exports = class Transport {
  constructor(data = {}) {
    this.setup(data);
  }

  setup(data) {
    this.id = data.id;
    this.routeID = 'routeID' in data ? data.routeID : null;
    this.route = 'route' in data ? data.route : new Route(this.routeID);
    this.position = 'lat' in data && 'lng' in data ? [data.lng, data.lat] : null;
    this.speed = 'speed' in data ? data.speed : null;
    this.direction = 'dir' in data ? data.dir : null;
    this.fetchedAt = 'fetched';
  }

  toJSON() {
    return {
      id: this.id,
      routeID: this.routeID,
      route: this.route,
      position: this.position,
      speed: this.speed,
      direction: this.direction,
    };
  }
};
