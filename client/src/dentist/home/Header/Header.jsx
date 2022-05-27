import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CommonButton from '../../../sharedComponents/CommonButton/CommonButton';
import NotificationBell from '../../../sharedComponents/NotificationBell/NotificationBell';
import HelpIcon from '@mui/icons-material/Help';

export default function Header({ title }) {
  const headerStyles = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#009be5',
      padding: '20px',
    },
    topRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'end',
      alignItems: 'center',
      marginBottom: '20px',
    },
    middleRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      marginLeft: '320px',
    },
    link: {
      fontWeight: 500,
      marginRight: '5px',
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover': {
        color: '#fff',
        cursor: 'pointer',
      },
    },
    webButton: {
      marginRight: '5px',
    },
  };
  return (
    <Box sx={headerStyles.wrapper}>
      <Box sx={headerStyles.topRow}>
        <Typography sx={headerStyles.link}>Go to docs</Typography>
        <NotificationBell iconColor="white" />
        <Avatar src="https://i.gyazo.com/91c25cfe3cba6768abc0f2153ce58538.png" />
      </Box>
      <Box sx={headerStyles.middleRow}>
        <Typography variant="h1" color="white">
          {title}
        </Typography>
        <Box>
          <CommonButton sx={headerStyles.webButton} variant="outlined">
            Web setup
          </CommonButton>
          <Tooltip title="help">
            <IconButton color="white" sx={headerStyles.helpIcon}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
