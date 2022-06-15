import axios from 'axios';

const login = async credentials => {
  const { data } = await axios.post('/login', credentials);
  return data;
};
// eslint-disable-next-line
let token = null;
const setToken = newToken => {
  token = `Bearer ${newToken}`;
};
// eslint-disable-next-line
let token2 = JSON.parse(window.localStorage.getItem('loggedToken'));

export default { login, setToken };
