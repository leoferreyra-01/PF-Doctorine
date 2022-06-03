import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import s from './ListButtons.module.css';
export default function ListButtons({ up, down }) {
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <button onClick={() => dispatch(up())}>
        <FontAwesomeIcon icon={faAngleUp} size="1x" />
      </button>
      <button onClick={() => dispatch(down())}>
        <FontAwesomeIcon icon={faAngleDown} size="1x" />
      </button>
    </div>
  );
}
