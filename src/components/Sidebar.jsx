import { Box, Typography, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const rooms = ["Bedroom 1", "Hall", "Kitchen"];

const Sidebar = ({ selectedRoom, setSelectedRoom, alert }) => {
  return (
    <Box
      minWidth={120}
      maxWidth={220}
      flex={1}
      bgcolor="#2c3e50"
      color="white"
      p={2}
      display="flex"
      flexDirection="column"
      sx={{
        overflow: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rooms
      </Typography>
      {rooms.map((room) => (
        <Button
          key={room}
          variant={selectedRoom === room ? "contained" : "text"}
          color="primary"
          onClick={() => setSelectedRoom(room)}
          sx={{
            color: "white",
            backgroundColor: selectedRoom === room ? "#1abc9c" : "transparent",
            justifyContent: "flex-start",

            mb: 1,
            "&:hover": {
              backgroundColor: "#16a085",
            },
          }}
        >
          {room}
          {alert && room === "Bedroom 1" && (
            <Box sx={{ marginLeft: "auto" }}>
              <NotificationsIcon />
            </Box>
          )}
        </Button>
      ))}
    </Box>
  );
};

export default Sidebar;
