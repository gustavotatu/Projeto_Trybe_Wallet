// Coloque aqui suas actions.

export const LOGIN_ACTION = 'LOGIN_ACTION';

export const loginAction = (email) => ({
  type: LOGIN_ACTION,
  email,
});
