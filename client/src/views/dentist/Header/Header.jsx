import React from 'react';
import s from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Header({ title }) {
  return (
    <div className={`${s.header_container}`}>
      <div className={`${s.header_title}`}>
        <h1 className={s.title}>{title}</h1>
      </div>
      <div className={`${s.avatar_container}`}>
        <button className={s.docs_btn}>Go to docs</button>
        <div className={`${s.fa_icon}`}>
          <FontAwesomeIcon
            icon={faBell}
            size="2x"
            // pull="left"
          />
        </div>
        <img
          src="https://i.gyazo.com/91c25cfe3cba6768abc0f2153ce58538.png"
          alt="Avatar Icon"
          className={s.avatar}
        />
      </div>
      <div className={s.help_container}>
        <button className={s.web_btn}>Web setup</button>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          size="2x"
          className={s.fa_icon}
          pull="left"
        />
      </div>
    </div>
  );
}
