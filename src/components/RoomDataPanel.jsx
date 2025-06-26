import { Box, Button, Typography } from "@mui/material";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import { useState, useEffect } from "react";
import fakeSensorData from "../data/fakeSensorData";
import HeartbeatCard from "./sensor-cards/HeartbeatCard";
import TemperatureCard from "./sensor-cards/TemperatureCard";
import WaterFlowCard from "./sensor-cards/WaterFlowCard";
import HumidityCard from "./sensor-cards/HumidityCard";
import DoorStatusCard from "./sensor-cards/DoorStatusCard";
import StatusCard from "./sensor-cards/StatusCard";
import LiveStream from "./Stream";

const RoomDataPanel = ({ sensorData, roomId }) => {
  //const [sensorData, setSensorData] = useState(null);
  const [showStream, setShowStream] = useState(false);

  const fakeData = {
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
  /*useEffect(() => {
    // Initialize with fake data
    setSensorData(fakeSensorData[roomId]);
  }, [roomId]);*/

  let alerts = [];
  console.log(sensorData);
  if (sensorData != null) {
    if (sensorData.fall.alert){
      alerts.push("Fall Detected");
    }
    if (sensorData.magneticDoor.alert) {
      alerts.push("Door Alert");
    }
    if (sensorData.waterFlow.alert) {
      alerts.push("Waterflow Alert");
    }
  }
  console.log(alerts);

  if (!sensorData)
    return (
      <Box p={4} flex={1}>
        <Typography>LOADING...</Typography>
      </Box>
    );

  return (
    <Box
      key={roomId}
      p={4}
      flex={5}
      bgcolor="#ecf0f1"
      sx={{
        overflow: "auto",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {roomId} - Live Data
      </Typography>

      <Box
        sx={{
          width: "100%",
          mt: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 0,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowStream((prev) => !prev)}
          sx={{
            alignSelf: "flex-start",
            marginLeft: "auto",
            marginBottom: 1,
            padding: 1,
          }}
        >
          <CameraIndoorIcon />
          {showStream ? "Hide CCTV Stream" : "View CCTV Stream"}
        </Button>

        {showStream && <LiveStream />}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
        sx={{ width: "100%" }}
      >
        <StatusCard alerts={alerts} roomId={roomId} />
        <HeartbeatCard data={fakeData} roomId={roomId} />
        <TemperatureCard data={sensorData.temp} roomId={roomId} />
        <WaterFlowCard data={sensorData.waterFlow} roomId={roomId} />
        <HumidityCard data={sensorData.temp} roomId={roomId} />
        <DoorStatusCard data={sensorData.magneticDoor} roomId={roomId} />
      </Box>
    </Box>
  );
};

export default RoomDataPanel;
