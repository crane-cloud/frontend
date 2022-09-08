// This function clears out the current user state and token
import removeUser from "../redux/actions/removeUser";

const redirectToLogin = (dispatch) => {
  dispatch(removeUser());
  localStorage.clear();
  window.location.href = "/";
};

export default redirectToLogin;
