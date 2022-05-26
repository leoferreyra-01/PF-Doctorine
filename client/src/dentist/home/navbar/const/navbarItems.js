import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Home',
    route: '/home',
  },
  {
    id: 1,
    icon: <CalendarTodayIcon />,
    label: 'Calendar',
    route: 'calendar',
  },

  {
    id: 2,
    icon: <NoteAltIcon />,
    label: 'Register Patient',
    route: 'register',
  },

  {
    id: 3,
    icon: <PaymentsIcon />,
    label: 'Budget',
    route: 'budget',
  },
  {
    id: 4,
    icon: <AssignmentIcon />,
    label: 'Show HC',
    route: 'clinical-history/1',
  },
  {
    id: 5,
    icon: <AssignmentIcon />,
    label: 'create hc',
    route: 'create-clinical-history',
  },
];
