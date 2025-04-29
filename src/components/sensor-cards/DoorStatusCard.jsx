import { Card, CardContent, Box, Typography } from '@mui/material';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useState, useEffect } from 'react';

const DoorStatusCard = ({ data, roomId }) => {
    
    if (data === null) {
        return (
            <Card key={roomId}>
                <CardContent>
                    <Typography variant="h5">Loading...</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                    <DoorFrontIcon color="brown" />
                    <Typography variant="h6">Door Status</Typography>
                </Box>
                <Typography variant="h5" color={data.status === 'Open' ? 'error' : 'success'}>
                    {data.status}
                </Typography>
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    mt={4}
                    sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: '120px',
                            transition: 'all 0.3s ease-in-out',
                        }
                    }}
                >
                    {data.status === 'Open' ? (
                        <MeetingRoomIcon sx={{ color: 'red' }} />
                    ) : (
                        <DoorFrontIcon sx={{ color: 'green' }} />
                    )}
                </Box>
                
            </CardContent>
        </Card>
    );
};

export default DoorStatusCard; 