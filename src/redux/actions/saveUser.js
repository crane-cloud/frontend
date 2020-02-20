import { SAVE_USER } from '../actions/actionTypes';

const saveUser = user => {
  return {
    type: SAVE_USER,
    user
  };
};

export default saveUser;
