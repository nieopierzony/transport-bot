'use strict';

const fs = require('fs');
const StaticMaps = require('staticmaps');
const svg2img = require('svg2img');

const { Colors, Transport } = require('../helpers/enums');
const varsToChange = ['%arrow.fill', '%arrow.stroke', '%circle.fill', '%circle.stroke', '%direction', '%route.number'];

const transportMarker = fs.readFileSync('./assets/transport.svg', 'utf-8');
const newTransMarker = recolorSvg(transportMarker, varsToChange, [...Colors[Transport.Minibus], 0, 220]);

// svg2img(newTransMarker, (err, buff) => {
//   if (err) console.error(err);
//   fs.writeFileSync(`assets/${date}.png`, buff);

//   const marker = {
//     img: `assets/${date}.png`,
//     offsetX: 30,
//     offsetY: 30,
//     width: 60,
//     height: 60,
//     coord: [30.45781, 50.46596],
//   };
//   map.addMarker(marker);

//   const coords = ''
//     .split(' ')
//     .map(i => i.split(','))
//     .map(i => [+i[1], +i[0]]);

//   const line = { coords, color: Colors[Transport.Minibus][2], simplify: true };

//   map.addLine(line);

//   map
//     .render([30.45781, 50.46596], 17)
//     .then(() => map.image.save(`${Date.now()}.png`))
//     .then(() => console.log('File saved!'))
//     .catch(console.log);
// });

module.exports = class Map extends StaticMaps {
    constructor(data = {}) {
        super(data)
        this.setup(data)
    }

    setup(data) {
        this.transport = data.transport || {}
        this.transport.number = data.transport.number || 
    }
  setTransport(lat, lng) {
    Object.defineProperty(this, 'trasportPoint', [lat, lng]);
    return this;
  }

  setTransType(type) {
    Object.defineProperty(this.transport, 'type', type);
  }

  toJSON() {
    return {};
  }
};

function recolorSvg(svg, oldExp = [], newExp = []) {
  oldExp.forEach((o, i) => (svg = svg.replace(new RegExp(o, 'gi'), newExp[i])));
  return svg;
}
