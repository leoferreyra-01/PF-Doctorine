import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PaymentsIcon from '@mui/icons-material/Payments';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <CalendarTodayIcon />,
    label: 'Calendar',
    route: 'calendar',
  },

  {
    id: 1,
    icon: <NoteAltIcon />,
    label: 'Register Patient',
    route: 'register',
  },

  {
    id: 2,
    icon: <PaymentsIcon />,
    label: 'Budget',
    route: 'budget',
  },
];
