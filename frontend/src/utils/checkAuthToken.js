// tokenUtils.js
import Cookies from 'js-cookie';

export const checkAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return { authenticated: true, token };
  } else {
    return { authenticated: false, token: null };
  }
};

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};





// import Cookies from 'js-cookie';

// export const checkAuthToken = () => {
//   const token = Cookies.get('accessToken');
//   if (token) {
//     return { authenticated: true, token };
//   } else {
//     return { authenticated: false, token: null };
//   }
// };




// import Cookies from 'js-cookie';

// export const checkAuthToken = () => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     return { authenticated: true, token };
//   } else {
//     return { authenticated: false, token: null };
//   }
// };
