import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
