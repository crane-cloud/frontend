import { SAVE_USER, REMOVE_USER } from "../actions/actionTypes";

const user = (user = { accessToken: "", data: {} }, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        accessToken: action.payload.access_token,
        data: {
          name: action.payload.username,
          email: action.payload.email,
          verified: action.payload.verified,
          id: action.payload.id,
        },
      };

    case REMOVE_USER:
      return {
        accessToken: false,
        data: {},
      };

    default:
      return user;
  }
};

export default user;
