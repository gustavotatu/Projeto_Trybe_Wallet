// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_ACTION, EXPENSES_ACTION, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_ACTION:
    return {
      ...state,
      currencies: action.currencyArray,
    };

  case EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.edExpense,
    };

  default: return state;
  }
};

export default wallet;
