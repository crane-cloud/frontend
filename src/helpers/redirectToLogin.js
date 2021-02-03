// This function clears out the current user state and token
export const redirectToLogin = () => {
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    window.location.href = '/login';
};