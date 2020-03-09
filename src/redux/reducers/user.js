import { SAVE_USER, REMOVE_USER } from '../actions/actionTypes';

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

  case REMOVE_USER: {
    return {
      accessToken: false,
      data: {}
    };
  }

  default:
    return user;
  }
};

export default user;
