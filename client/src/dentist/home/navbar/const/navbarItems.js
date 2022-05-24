import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import DnsIcon from '@mui/icons-material/Dns';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: 'Authentication',
    route: '/home/authentication',
  },
  {
    id: 1,
    icon: <DnsIcon />,
    label: 'Database',
    route: '/home/calendar',
  },
  {
    id: 2,
    icon: <ImageIcon />,
    label: 'Storage',
    route: '/home/storage',
  },
  {
    id: 3,
    icon: <PublicIcon />,
    label: 'Hosting',
    route: '/home/hosting',
  },
  {
    id: 4,
    icon: <SettingsEthernetIcon />,
    label: 'Functions',
    route: '/home/budget',
  },
  {
    id: 5,
    icon: <SettingsInputComponentIcon />,
    label: 'Machine learning',
    route: '/home/machine-learning',
  },
];
