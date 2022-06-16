import React from 'react';
import s from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faClipboardUser,
  faMoneyBills,
  faSquarePlus,
  faCircleInfo,
  faUserPlus,
  faUserDoctor,
  faHospital,
} from '@fortawesome/free-solid-svg-icons';
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
    icon: <FontAwesomeIcon icon={faCalendar} size="2x" className={s.fa_icon} />,
    label: 'Calendar',
    route: 'calendar',
  },

  {
    id: 2,
    icon: <FontAwesomeIcon icon={faUserPlus} size="2x" className={s.fa_icon} />,
    label: 'Register Patient',
    route: 'register',
  },

  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faMoneyBills} size="2x" className={s.fa_icon} />
    ),
    label: 'Budgets',
    route: 'budget',
  },
  {
    id: 4,
    icon: (
      <FontAwesomeIcon icon={faSquarePlus} size="2x" className={s.fa_icon} />
    ),
    label: 'Add Budget',
    route: 'addBudget',
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faHospital} size="2x" className={s.fa_icon} />,
    label: 'Clinic info',
    route: 'clinic-details',
  },
  {
    id: 6,
    icon: (
      <FontAwesomeIcon icon={faUserDoctor} size="2x" className={s.fa_icon} />
    ),
    label: 'Update My Info',
    route: 'updateMedic',
  },
  {
    id: 7,
    icon: (
      <FontAwesomeIcon icon={faCircleInfo} size="2x" className={s.fa_icon} />
    ),
    label: 'Treatments Info',
    route: 'infoTreatments',
  },
  {
    id: 8,
    icon: (
      <FontAwesomeIcon icon={faClipboardUser} size="2x" className={s.fa_icon} />
    ),
    label: 'Sign out',
    route: '/',
  },
];
