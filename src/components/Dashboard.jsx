import { useState, useEffect, useRef } from "react";
import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import Sidebar from "./Sidebar";
import RoomDataPanel from "./RoomDataPanel";
import notificationSound from "../assets/sounds/notification.wav";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState("Bedroom 1");
  const [sensorData, setSensorData] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [alertsActive, setAlertsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const notificationAudioRef = useRef(null);

  const fakeData = {
    "magneticDoor": {
      "TS": null,
      "sensor_id": null,
      "alert": null,
      "status": null,
      "timestamp": null
    },
    "waterFlow": {
      "TS": null,
      "flow_rate": null,
      "total_litres": null,
      "sensor_id": null,
      "alert": null,
      "timestamp": null
    },
    "temp": {
      "TS": null,
      "Temperature": null,
      "TimeStamp": null,
      "sensor_id": null,
      "Humidity": null
    },
    "fall": {
      "sensor_id": null,
      "alert": null,
      "timestamp": null
    }
  };
  

  // Fetch sensor data
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://qmfqvnsbr6.execute-api.ap-south-1.amazonaws.com/fetchSensorData",
        );
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();

    const id = setInterval(() => {
      fetchSensorData();
    }, 2000);

    return () => clearInterval(id);
  }, []);

  // Unlock sound on user interaction
  useEffect(() => {
    notificationAudioRef.current = new Audio(notificationSound);
  }, []);

  // Handle unlocking
  const handleUnlock = () => {
    notificationAudioRef.current
      .play()
      .then(() => {
        notificationAudioRef.current.pause();
        notificationAudioRef.current.currentTime = 0;
        setUnlocked(true);
      })
      .catch((error) => {
        console.error("Unlock failed:", error);
        setUnlocked(true);
      });
  };

  // Function to play notification sound in a loop
  const playNotificationSound = () => {
    if (notificationAudioRef.current && !isMuted) {
      notificationAudioRef.current.loop = true;
      notificationAudioRef.current.play();
    }
  };

  // Function to stop the notification sound
  const stopNotificationSound = () => {
    if (notificationAudioRef.current) {
      notificationAudioRef.current.pause();
      notificationAudioRef.current.currentTime = 0;
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stopNotificationSound();
    } else if (alertsActive) {
      playNotificationSound();
    }
  };

  // Check alerts based on sensor data
  useEffect(() => {
    if (unlocked && sensorData) {
      const alerts = [];

      if (sensorData.magneticDoor?.alert) {
        alerts.push("Door Alert");
      }
      if (sensorData.waterFlow?.alert) {
        alerts.push("Waterflow Alert");
      }
      if (sensorData.fall?.alert) {
        alerts.push("Fall Alert");
      }
      if (alerts.length > 0) {
        setAlertsActive(true);
        playNotificationSound();
      } else {
        setAlertsActive(false);
        stopNotificationSound();
      }
    }
  }, [sensorData, unlocked]);

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        sx={{ overflow: "hidden" }}
      >
        <AppBar position="static" sx={{ bgcolor: "#2c3e50" }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={toggleMute} sx={{ mr: 2 }}>
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box display="flex" flex={1} sx={{ overflow: "hidden" }}>
          <Sidebar
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            alert={alertsActive}
          />
          <RoomDataPanel sensorData={selectedRoom === "Bedroom 1" ? sensorData : fakeData} roomId={selectedRoom} />
        </Box>
      </Box>

      {!unlocked && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(0, 0, 0, 0.4)"
          zIndex={1300}
        >
          <Box
            sx={{
              bgcolor: "white",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              textAlign: "center",
              minWidth: 200,
              maxWidth: 400,
              width: "50%",
            }}
          >
            <VolumeUpIcon sx={{ fontSize: 50, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body2" gutterBottom>
              This app uses sound notifications. Click below to enable audio.
            </Typography>
            <button
              onClick={handleUnlock}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
                fontSize: "1rem",
              }}
            >
              Enable & Start
            </button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
