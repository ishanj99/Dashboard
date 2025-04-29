import { Card, CardContent, Box, Typography } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import ReactSpeedometer from 'react-d3-speedometer';

const WaterFlowCard = ({ data, roomId }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <OpacityIcon color="primary" />
          <Typography variant="h6">Water Flow</Typography>
        </Box>
        <Typography variant="h5">{data.flow_rate} L/min</Typography>
        <Box 
          mt={5} 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          sx={{ minHeight: '150px' }}
        >
          <ReactSpeedometer
            value={data.flow_rate}
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
            valueText={`${data.flow_rate} L/min`}
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

export default WaterFlowCard; 