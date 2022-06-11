import React from 'react';
import s from './HeaderPatient.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header({ title }) {
  return (
    // <div className={`${s.header_container}`}>
    <div className="header_container">
      <div className="header_title">
        <h1 className="title">{title}</h1>
      </div>
      <div className="avatar_container">
        {/* <button className='docs_btn'>Go to docs</button> */}
        <div className="fa_icon">
          {/* <FontAwesomeIcon
            icon={faBell}
            size="2x"
          // pull="left"
          /> */}
        </div>
        <img
          // src="https://i.gyazo.com/91c25cfe3cba6768abc0f2153ce58538.png"
          src="https://pngimage.net/wp-content/uploads/2018/06/happy-customer-icon-png-5.png"
          alt="Avatar Icon"
          className="avatar"
        />
      </div>
      <div className="help_container">
        <Link to="/home/payments">
          <button className="web_btn">Payments</button>
        </Link>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          size="2x"
          className="fa_icon"
          pull="left"
        />
      </div>
    </div>
  );
}
