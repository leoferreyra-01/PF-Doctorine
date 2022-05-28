import React from 'react';
import s from './loader.module.css';
export default function Loader({ setLoader }) {
  {
    setTimeout(() => {
      setLoader(false);
    }, 1600);
  }
  return (
    <div className={s.container}>
      <div className={s.spinner}>
        <div className={s.inner}></div>
      </div>
    </div>
  );
}
