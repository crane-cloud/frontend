import { SAVE_USER } from './actionTypes';

const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user
});

export default saveUser;
