import React, { useEffect } from 'react';
import s from './UpdateTreatments.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Treatment from '../Treatment/Treatment';
import { getTreatments } from '../../../redux/actions';

function UpdateTreatments() {
  const dispatch = useDispatch();
  const treatments = useSelector(state => state.treatments);
  const filledTreatments = !!treatments.length;

  useEffect(() => {
    if (!filledTreatments) dispatch(getTreatments());
  }, []);
  return (
    <div className={s.container}>
      {filledTreatments ? (
        treatments.map(t => (
          <Treatment
            key={t.ID}
            ID={t.ID}
            description={t.description}
            price={t.price}
          />
        ))
      ) : (
        <h3>Loading treatments...</h3>
      )}
    </div>
  );
}

export default UpdateTreatments;
