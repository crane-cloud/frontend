import { SAVE_USER } from '../actions/actionTypes';

const saveUser = user => {
  console.log(user);
  return {
    type: SAVE_USER,
    user
  };
};

export default saveUser;
