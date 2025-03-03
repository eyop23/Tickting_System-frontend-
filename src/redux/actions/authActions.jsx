// src/redux/actions/authActions.js
export const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const signupUser = (user) => {
  return {
    type: "SIGNUP_USER",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
