import { Card, CardContent, Box, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ReactSpeedometer from "react-d3-speedometer";

const HumidityCard = ({ data, roomId }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <WaterDropIcon color="info" />
          <Typography variant="h6">Humidity</Typography>
        </Box>
        <Typography variant="h5">{data.Humidity}%</Typography>
        {/* <Box mt={2}>
          <GaugeChart
            id="humidity-gauge"
            nrOfLevels={5}
            percent={data.Humidity / 100}
            colors={["#00ff00", "#ffa500", "#ff0000"]}
            arcWidth={0.3}
            textColor="#000000"
            needleColor="#345243"
            needleBaseColor="#000000"
            hideText={true}
            animDelay={0}
            animateDuration={0}
          />
          <Typography variant="body2" align="center" mt={1}>
            {data.Humidity}%
          </Typography> 
        </Box>*/}

        <Box
          mt={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "150px" }}
        >
          <ReactSpeedometer
            value={data.Humidity !== null ? data.Humidity : 0}
            minValue={0}
            maxValue={70}
            //segments={6}
            needleColor="#345243"
            //startColor="#00ff00"
            //endColor="#ff0000"
            needleHeightRatio={0.7}
            width={200}
            height={150}
            textColor="#000000"
            valueText={`${data.Humidity} L/min`}
            ringWidth={20}
            needleTransitionDuration={1000}
            needleTransition="easeElastic"
            paddingHorizontal={0}
            paddingVertical={0}
            customSegmentStops={[0, 15, 25, 50, 70]}
            segmentColors={[
              "#ffa500", // 0°C - 20°C: Cold
              "#ffff00", // 20°C - 22°C: Cool
              "#00ff00", // 22°C - 24°C: Slightly Warm
              "#ffa500", // 24°C - 26°C: Pleasant
              // 30°C - 50°C: Hot
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HumidityCard;
