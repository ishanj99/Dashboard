import { Card, CardContent, Box, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import GaugeChart from 'react-gauge-chart';
import { useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';




const TemperatureCard = ({ data, roomId }) => {

  useEffect(() => {
    console.log('mounted');
    return () => {
      console.log('unmounted');
    };
  }, []);

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <ThermostatIcon color="warning" />
          <Typography variant="h6">Temperature</Typography>
        </Box>
        <Typography variant="h5">{data.Temperature} °C</Typography>
        
          <Box 
          mt={5} 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          sx={{ minHeight: '150px' }}
        >
          <ReactSpeedometer
            value={data.Temperature}
            minValue={0}
            maxValue={50}
            segments={5}
            needleColor="#345243"
            startColor="#00ff00"
            endColor="#ff0000"
            needleHeightRatio={0.7}
            width={200}
            height={150}
            textColor="#000000"
            valueText={`${data.Temperature} L/min`}
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

export default TemperatureCard; 