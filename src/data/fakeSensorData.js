const fakeSensorData = {
  Room1: {
    heartbeat: 78,
    temperature: 36,
    waterFlow: 2.3,
    status: "Normal",
    humidity: 45,
    doorStatus: "Closed",
    timestamp: Date.now(),
  },
  Room2: {
    heartbeat: 102,
    temperature: 39,
    waterFlow: 1.7,
    status: "Alert",
    humidity: 60,
    doorStatus: "Open",
    timestamp: Date.now(),
  },
  Room3: {
    heartbeat: 88,
    temperature: 34,
    waterFlow: 3.2,
    status: "Normal",
    humidity: 50,
    doorStatus: "Closed",
    timestamp: Date.now(),
  },
};

export default fakeSensorData;
