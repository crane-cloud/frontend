// This function clears out the current user state and token
const redirectToLogin = () => {
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export default redirectToLogin;