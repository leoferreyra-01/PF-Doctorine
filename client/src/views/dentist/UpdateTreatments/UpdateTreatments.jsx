import React, { useEffect } from 'react';
import s from './UpdateTreatments.module.css';
import { useSelector, useDispatch } from 'react-redux';

import { getTreatments, updateTreatment } from '../../../redux/actions';

//|| agregado por Laura
import { DataGrid } from '@material-ui/data-grid';
//||

function UpdateTreatments() {
  const dispatch = useDispatch();
  const treatments = useSelector(state => state.treatments);
  const filledTreatments = !!treatments.length;

  useEffect(() => {
    if (!filledTreatments) dispatch(getTreatments());
  }, []);

  //|| agregado por Laura
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'treatmentType',
      headerName: 'Treatment Type',
      width: 200,
      /* fontSize: '40px', */
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 600,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 200,
      editable: true,
    },
  ];
  return (
    <div className={s.container}>
      <div style={{ height: 550, width: '100%' }}>
        {filledTreatments ? (
          <DataGrid
            onCellEditCommit={(params, event, details) => {
              console.log(params);
              console.log(event);
              console.log(details);
              //dispatch(updateTreatment({ id: params.id, price: params.value }));
            }}
            rows={treatments.map(t => ({
              id: t.ID,
              treatmentType: t.treatmentType,
              description: t.description,
              price: t.price,
            }))}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        ) : (
          <h3>Loading treatments...</h3>
        )}
      </div>
    </div>
  );
  //||
}

export default UpdateTreatments;
