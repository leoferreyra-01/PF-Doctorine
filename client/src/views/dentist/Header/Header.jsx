import React from 'react';
import s from './Header.module.css';

export default function Header({ title }) {
  return (
    <div className={`${s.header_container}`}>
      <div className={`${s.header_title}`}>
        <h1 className={s.title}>{title}</h1>
      </div>
      <div className={`${s.avatar_container}`}>
        {/* <button className={s.docs_btn}>Go to docs</button> */}
        {/* <span className="fa-layers fa-fw fa-lg">
          <FontAwesomeIcon icon={faCircle} />
          <FontAwesomeIcon icon={faCheck} transform="shrink-6" />
        </span> */}
        {/* <span
          class="fa-layers fa-fw fa-5x"
          style={{ backgroundColor: 'MistyRose' }}
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span
            class="fa-layers-counter "
            style={{ backgroundColor: 'tomato' }}
          >
            1,419
          </span>
        </span> */}
        {/* <span
          className={`${s.fa_icon}`}
          class="fa-layers fa-fw fa-4x fa_icon"
          // style={{ backgroundColor: 'MistyRose' }}
        >
          <FontAwesomeIcon
            icon={faBell}
            size="xs"
            // pull="left"
          />
          <span
            class="fa-layers-counter fa-layers-top-right"
            style={{ backgroundColor: 'tomato' }}
          >
            1,419
          </span>
        </span> */}
        <img
          src="https://pngimage.net/wp-content/uploads/2018/06/happy-customer-icon-png-5.png"
          alt="Avatar Icon"
          className={s.avatar}
        />
      </div>
      {/* <div className={s.help_container}>
        <button className={s.web_btn}>Web setup</button>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          size="2x"
          className={s.fa_icon}
          pull="left"
        />
      </div> */}
    </div>
  );
}
