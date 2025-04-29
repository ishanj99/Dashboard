import { Card, CardContent, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactSpeedometer from 'react-d3-speedometer';
import { useState, useEffect } from 'react';

const HeartbeatCard = ({ data, roomId }) => {


  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <FavoriteIcon color="error" />
          <Typography variant="h6">Heartbeat</Typography>
        </Box>
        <Typography variant="h5">{data.heartbeat} bpm</Typography>
        <Box 
          mt={5} 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          
        >
          <ReactSpeedometer
            value={data.heartbeat}
            minValue={40}
            maxValue={180}
            segments={7}
            needleColor="#345243"
            startColor="#00ff00"
            endColor="#ff0000"
            needleHeightRatio={0.7}
            width={200}
            height={150}
            textColor="#000000"
            valueText={`${data.heartbeat} L/min`}
            ringWidth={20}
            needleTransitionDuration={1000}
            needleTransition="easeElastic"
            paddingHorizontal={0}
            paddingVertical={0}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HeartbeatCard; 