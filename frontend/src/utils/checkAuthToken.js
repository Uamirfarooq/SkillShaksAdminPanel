import Cookies from 'js-cookie';

export const checkAuthToken = () => {
  const token = Cookies.get('authToken');
  console.log("this is token",token);
  if (token) {
    return { authenticated: true, token };
  } else {
    return { authenticated: false, token: null };
  }
};
