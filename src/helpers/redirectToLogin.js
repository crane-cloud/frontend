// This function clears out the current user state and token
import removeUser from '../redux/actions/removeUser';

const redirectToLogin = (dispatch) => {
    
    dispatch(removeUser());
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    localStorage.removeItem('project');
        
    window.location.href = '/login';
};

export default redirectToLogin;