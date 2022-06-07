import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTreatments } from '../../../redux/actions';
export function AddBudget() {
  const dispatch = useDispatch();
  const treatments = useSelector(state => state.treatments);
  const filledTreatments = !!treatments.length;
  useEffect(() => {
    if (!filledTreatments) dispatch(getTreatments());
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name='treatmentSelected'>
          <option hidden value=''>
            Select Treatment
          </option>
          {filledTreatments ? (
            treatments.map(t => (
              <option key={t.ID} value={t.description}>
                {t.description}
              </option>
            ))
          ) : (
            <h3>Loading Treaments...</h3>
          )}
        </select>
      </form>
    </div>
  );
}
