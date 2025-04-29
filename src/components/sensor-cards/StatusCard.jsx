import { Card, CardContent, Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const StatusCard = ({ alerts, roomId }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <CircleIcon fontSize="small" sx={{ color: alerts.length > 0 ? 'red' : 'green' }} />
          <Typography variant="h6">Status</Typography>
        </Box>
        {alerts.map((alert) => {
        return <Typography key={alert} variant="h5">{alert}</Typography>
        })}
      </CardContent>
    </Card>
  );
};

export default StatusCard; 