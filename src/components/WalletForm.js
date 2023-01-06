import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveCurrencies, expensesAction } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.getExpensesDetails = this.getExpensesDetails.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(saveCurrencies());
  }

  getExpensesDetails({ target: { value, name } }) {
    switch (name) {
    case 'expense':
      this.setState({
        value,
      });
      break;

    case 'description':
      this.setState({
        description: value,
      });
      break;

    case 'currency':
      this.setState({
        currency: value,
      });
      break;

    case 'method':
      this.setState({
        method: value,
      });
      break;

    case 'tag':
      this.setState({
        tag: value,
      });
      break;

    default:
      break;
    }
  }

  async addExpense() {
    const { expensesArray, dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    this.setState({
      id: expensesArray.length,
      exchangeRates: json,
    });
    setTimeout(() => {
      dispatch(expensesAction(this.state));
    }, '0.1');

    const valueInput = document.getElementById('value');
    const descInput = document.getElementById('desc');

    if (valueInput.value !== '' || descInput !== '') {
      valueInput.value = '';
      descInput.value = '';
    }
  }

  render() {
    const { currenciesArray } = this.props;
    return (
      <form>
        <h2>Wallet Form</h2>
        <div>
          <p>Valor da despesa:</p>
          <input
            id="value"
            name="expense"
            type="number"
            data-testid="value-input"
            onChange={ this.getExpensesDetails }
          />
        </div>
        <br />
        <div>
          <p>Descrição da despesa:</p>
          <textarea
            id="desc"
            name="description"
            data-testid="description-input"
            onChange={ this.getExpensesDetails }
          />
        </div>
        <br />
        <div>
          <p>Moeda:</p>
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.getExpensesDetails }
          >
            { currenciesArray !== undefined && currenciesArray.map((currency) => (
              <option key={ currency }>{ currency }</option>
            )) }
          </select>
        </div>
        <div>
          <p>Forma de pagamento:</p>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.getExpensesDetails }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <p>Tag:</p>
          <select name="tag" data-testid="tag-input" onChange={ this.getExpensesDetails }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={ this.addExpense }>Adicionar despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesArray: state.wallet.currencies,
  expensesArray: state.wallet.expenses,
});

WalletForm.propTypes = {
  currenciesArray: propTypes.arrayOf.isRequired,
  expensesArray: propTypes.arrayOf.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
