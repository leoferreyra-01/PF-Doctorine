import React from 'react';
import s from './SideBar.module.css';
import { useNavigate } from 'react-router-dom';
import { mainSidebarItems } from './sidebarItems';

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div className={s.sidebar_container}>
      <div className={s.serviceLogo_container}>
        <img
          src="https://i.gyazo.com/759c94436d8bcf34b65fb0e9ca1a4548.png"
          className={s.serviceLogo}
          alt="Service Logo"
        />
      </div>
      <div className={s.divider}></div>
      <div className={s.icons_container}>
        {mainSidebarItems.map(item => (
          <div
            key={item.id}
            className={s.icon_container}
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            <h4 className={s.icon_title}>{item.label}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
