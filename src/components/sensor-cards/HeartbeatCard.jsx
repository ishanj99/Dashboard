import { Card, CardContent, Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReactSpeedometer from "react-d3-speedometer";
import { useState, useEffect } from "react";

const HeartbeatCard = ({ data, roomId }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <FavoriteIcon color="error" />
          <Typography variant="h6">Heartbeat</Typography>
        </Box>
        <Typography variant="h5">{data.heartbeat} bpm</Typography>
        <Box mt={5} display="flex" justifyContent="center" alignItems="center">
          <ReactSpeedometer
            value={data.heartbeat}
            minValue={0}
            maxValue={180}
            needleColor="#345243"
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
            customSegmentStops={[0, 40, 60, 100, 130, 150, 180]}
            segmentColors={[
              "#ff0000", // 0-60: Red (Too low)
              "#ffa500",
              "#00ff00", // 60-100: Green (Safe zone)

              //"#00ff00", // 100-100: Green (Safe zone)
              "#ffff00", // 100-130: Yellow (Approaching danger)
              "#ffa500", // 130-150: Orange (High warning)
              "#ff0000", // 150-180: Red (Too high)
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HeartbeatCard;
