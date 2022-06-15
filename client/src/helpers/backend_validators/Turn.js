import axios from 'axios';

export default async function validateTurn(turn, TurnID = null) {
  try {
    let rute = '';
    let ruteType = '';
    if (TurnID) {
      rute = '/turns/update' + TurnID + '/?validate=true';
      ruteType = 'put';
    } else {
      rute = '/turns/?validate=true';
      ruteType = 'post';
    }
    return (await axios[ruteType](rute, turn)).data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}
