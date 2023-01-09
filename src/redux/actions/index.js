// Coloque aqui suas actions.

export const LOGIN_ACTION = 'LOGIN_ACTION';

export const loginAction = (email) => ({
  type: LOGIN_ACTION,
  email,
});

// -----------------------------------------------------------------------------------------------------------------

export const API_ACTION = 'API_ACTION';

export const apiAction = (currencyArray) => ({
  type: API_ACTION,
  currencyArray,
});

export const fetchApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  const filteredJson = Object.keys(json).filter((currency) => currency !== 'USDT');
  return filteredJson;
};

export function saveCurrencies() {
  return async (dispatch) => {
    const currencies = await fetchApi();
    dispatch(apiAction(currencies));
  };
}

//--------------------------------------------------------------------------------------------------------------------

export const EXPENSES_ACTION = 'EXPENSES_ACTION';

export const expensesAction = (expenses) => ({
  type: EXPENSES_ACTION,
  expenses,
});

//------------------------------------------------------------------------------------------------------------------------

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
