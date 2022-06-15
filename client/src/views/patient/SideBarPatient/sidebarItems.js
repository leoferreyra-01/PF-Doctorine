import React from 'react';
import s from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faClipboardUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export const mainSidebarItems = [
  {
    id: 0,
    icon: <FontAwesomeIcon icon={faHouse} size="2x" className={s.fa_icon} />,
    label: 'Home',
    route: '/home',
  },

  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faClipboardUser} size="2x" className={s.fa_icon} />
    ),
    label: 'My data',
    route: 'data',
  },

  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faClipboardUser} size="2x" className={s.fa_icon} />
    ),
    label: 'Update my data',
    route: 'dataUpdate',
  },

  {
    id: 3,
    icon: <FontAwesomeIcon icon={faCalendar} size="2x" className={s.fa_icon} />,
    label: 'medical appointment request',
    route: 'appointment',
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faCalendar} size="2x" className={s.fa_icon} />,
    label: 'Clinic history',
    route: 'PatientCH',
  },

  {
    id: 5,
    icon: (
      <FontAwesomeIcon icon={faClipboardUser} size="2x" className={s.fa_icon} />
    ),
    label: 'Evolutions and Studies',
    route: 'evolutionsNStudies',
  },
  {
    id: 5,
    icon: (
      <FontAwesomeIcon icon={faClipboardUser} size="2x" className={s.fa_icon} />
    ),
    label: 'Sign out',
    route: '/',
  },
];
