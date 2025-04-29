import { useState, useEffect, useRef } from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import RoomDataPanel from './components/RoomDataPanel';
import notificationSound from './assets/sounds/notification.wav';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const App = () => {
  const [selectedRoom, setSelectedRoom] = useState('Room1');
  const [sensorData, setSensorData] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [alertsActive, setAlertsActive] = useState(false); // Track if any alert is active
  const notificationAudioRef = useRef(null);

  // Fetch sensor data
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('https://qmfqvnsbr6.execute-api.ap-south-1.amazonaws.com/fetchSensorData');
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
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
    notificationAudioRef.current.play()
      .then(() => {
        notificationAudioRef.current.pause();
        notificationAudioRef.current.currentTime = 0;
        setUnlocked(true);
      })
      .catch((error) => {
        console.error('Unlock failed:', error);
        setUnlocked(true); // Still allow entering site even if sound unlock fails
      });
  };

  // Function to play notification sound in a loop
  const playNotificationSound = () => {
    if (notificationAudioRef.current) {
      notificationAudioRef.current.loop = true; // Loop the sound
      notificationAudioRef.current.play();
    }
  };

  // Function to stop the notification sound
  const stopNotificationSound = () => {
    if (notificationAudioRef.current) {
      notificationAudioRef.current.pause();
      notificationAudioRef.current.currentTime = 0; // Reset sound
    }
  };

  // Check alerts based on sensor data
  useEffect(() => {
    if (unlocked && sensorData != null) {
      const alerts = [];

      if (sensorData.magneticDoor.alert) {
        alerts.push("Door Alert");
      }
      if (sensorData.waterFlow.alert) {
        alerts.push("Waterflow Alert");
      }

      // If there are any active alerts, play sound in a loop
      if (alerts.length > 0) {
        setAlertsActive(true);
        playNotificationSound();
      } else {
        setAlertsActive(false);
        stopNotificationSound();
      }
    }
  }, [sensorData, unlocked]); // Re-run this effect when sensorData or unlocked changes

  return (
    <div>
  <Box display="flex" flexDirection="column" height="100vh" sx={{ overflow: 'hidden' }}>
    <AppBar position="static" sx={{ bgcolor: '#2c3e50' }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    <Box display="flex" flex={1} sx={{ overflow: 'hidden' }}>
      <Sidebar selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} alert={alertsActive} />
      <RoomDataPanel sensorData={sensorData} roomId={selectedRoom} />
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
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: 'center',
          minWidth: 200,
          maxWidth: 400,
          width: '50%'
        }}
      >
        <VolumeUpIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        <Typography variant="h6" gutterBottom>Welcome</Typography>
        <Typography variant="body2" gutterBottom>
          This app uses sound notifications. Click below to enable audio.
        </Typography>
        <button onClick={handleUnlock} style={{ marginTop: '16px', padding: '8px 16px', fontSize: '1rem' }}>
          Enable & Start
        </button>
      </Box>
    </Box>
  )}
</div>

  );
};

export default App;
