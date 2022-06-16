// import React from 'react';
import React from 'react';
import s from './HeaderPatient.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header({ title }) {
  if (title === ' PatientCH') title = 'Clinic history';

  return (
    // <div className={`${s.header_container}`}>
    <div>
      <h1 className={s.title}>{title}</h1>
      <div className={s.headercontainer}>
        <div className={s.avatarcontainer}>
          {/* <button className='docs_btn'>Go to docs</button> */}
          <div className="fa_icon">
            {/* <FontAwesomeIcon
            icon={faBell}
            size="2x"
          // pull="left"
          /> */}
          </div>
          <div className={s.helpcontainer}>
            <Link to="/home/payments">
              <button>
                <span className={s.transition}></span>
                <span className={s.gradient}></span>
                <span className={s.label}>Payments</span>
              </button>
            </Link>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              size="2x"
              className="fa_icon"
              pull="left"
            />
          </div>
          <img
            // src="https://i.gyazo.com/91c25cfe3cba6768abc0f2153ce58538.png"
            src="https://pngimage.net/wp-content/uploads/2018/06/happy-customer-icon-png-5.png"
            alt="Avatar Icon"
            className={s.avatar}
          />
        </div>
      </div>
    </div>
  );
}
