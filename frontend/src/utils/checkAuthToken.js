import Cookies from 'js-cookie';

export const checkAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return { authenticated: true, token };
  } else {
    return { authenticated: false, token: null };
  }
};