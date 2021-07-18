'use strict';

const WebSocket = require('ws');

module.exports = bot => {
  const ws = new WebSocket('wss://online.kpt.kyiv.ua/socket.io/?transport=websocket');

  ws.on('open', () => {
    ws.send('2probe');
  });

  ws.on('message', data => {
    if (!data.startsWith('42')) return;
    ws.send('2');

    const locations = bot.context.locations || [];
    const jsonData = JSON.parse(data.substring(2));

    jsonData[1].forEach(row => {
      const location = row.split(',');
      const vehicleData = {
        vehicleID: +location[0],
        routeID: +location[1],
        lat: +location[2],
        lng: +location[3],
        speed: +location[4],
        dir: +location[5],
        fetchedAt: new Date(+location[6] * 1000),
      };

      let existingVehicle = locations.find(i => i.vehicleID === vehicleData.vehicleID);
      if (existingVehicle) existingVehicle = vehicleData;
      else locations.push(vehicleData);
    });

    bot.context.locations = locations;
  });
};
