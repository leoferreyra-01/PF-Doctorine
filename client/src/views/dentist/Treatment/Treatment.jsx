import React from 'react';
import s from './Treatment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
export default function Treatment({
  description,
  ID,
  price,
  quantity,
  subTotalPrice,
  handleMinus,
  handlePlus,
}) {
  return (
    <div className={s.treatment}>
      <p className={s.text}>{description}</p>
      <p className={s.text}>{price}</p>
      <div className={s.quantity}>
        <button onClick={() => handleMinus(ID)}>
          <FontAwesomeIcon icon={faMinus} size="1x" />
        </button>
        <p className={s.text}>{quantity}</p>
        <button onClick={() => handlePlus(ID)}>
          <FontAwesomeIcon icon={faPlus} size="1x" />
        </button>
      </div>
      <p className={s.text}>{subTotalPrice}</p>
    </div>
  );
}
