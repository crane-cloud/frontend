import { SAVE_USER } from '../actions/actionTypes';

const user = ( user = { accessToken: false, data: {} }, action) => {
  switch (action.type) {
  case SAVE_USER: {
    const { access_token, ...restOfProperties } = action.user;
    return {
      accessToken: access_token,
      data: {
        ...restOfProperties
      }
    };
  }

  default:
    return user;
  }
};

export default user;
