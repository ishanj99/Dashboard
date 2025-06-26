import { useState } from "react";
import { Card, CardContent, Box, Typography, Button, CircularProgress } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const StatusCard = ({ alerts, roomId }) => {
  const [recoveryLoading, setRecoveryLoading] = useState(null); // holds alert string being recovered

  const markAsRecovered = async (alertType) => {
    setRecoveryLoading(alertType);

    try {
      await fetch("https://59fia9tmgi.execute-api.ap-south-1.amazonaws.com/setFallFalse", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          alert: alertType,
        }),
      });

      // No alert needed, your parent fetch will auto-update the state
    } catch (error) {
      console.error("Recovery failed:", error);
    } finally {
      setRecoveryLoading(null);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon
            fontSize="small"
            sx={{ color: alerts.includes("Fall Detected") ? "red" : "green" }}
          />
          <Typography variant="h6">Status</Typography>
        </Box>

        {alerts.map((alert, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="row"
            alignItems="center"
            mt={1}
            mb={1}
          >
            <Typography variant="h5" component="span">
              {alert}
            </Typography>

            {alert === "Fall Detected" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => markAsRecovered(alert)}
                sx={{ marginLeft: "auto", padding: 1 }}
                disabled={recoveryLoading === alert}
              >
                {recoveryLoading === alert ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Recovered"
                )}
              </Button>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
