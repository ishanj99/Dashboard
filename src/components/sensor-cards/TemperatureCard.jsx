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
  needleHeightRatio={0.7}
  width={200}
  height={150}
  textColor="#000000"
  valueText={`${data.Temperature} °C`}
  ringWidth={20}
  needleTransitionDuration={1000}
  needleTransition="easeElastic"
  paddingHorizontal={0}
  paddingVertical={0}
  customSegmentStops={[0, 10, 18, 26, 30, 35, 50]}
  segmentColors={[
    "#372cf8", // 0°C - 20°C: Cold
    "#4fe0f2", // 20°C - 22°C: Cool
    "#00FF00", // 22°C - 24°C: Slightly Warm
    "#FFFF00", // 24°C - 26°C: Pleasant
    "#FFA500", // 26°C - 28°C: Slightly Warm
    "#FF4500", // 28°C - 30°C: Warm
    "#FF0000", // 30°C - 50°C: Hot
  ]}
/>

        </Box>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard; 