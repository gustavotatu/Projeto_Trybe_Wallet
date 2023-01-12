import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExp } from '../redux/actions/index';

class Edit extends Component {
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
    this.edExpense = this.edExpense.bind(this);
  }

  componentDidMount() {
    const { location: { state: { id } }, expensesArray } = this.props;
    const { exchangeRates } = expensesArray[(Number(id))];
    this.setState({
      id: Number(id),
      exchangeRates,
    });
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

  async edExpense() {
    const { expensesArray, dispatch, location: { state: { id } }, history } = this.props;
    const expenses = expensesArray;
    const array = this.state;
    expenses[id] = array;
    console.log(this.state);
    dispatch(editExp(expenses));
    history.push('/carteira');
  }

  render() {
    const { currenciesArray } = this.props;
    return (
      <form>
        <h2>Wallet Form</h2>
        <h3>Edite sua despesa</h3>
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
          <button type="button" onClick={ this.edExpense }>Editar despesa</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesArray: state.wallet.currencies,
  expensesArray: state.wallet.expenses,
});

Edit.propTypes = {
  currenciesArray: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
  expensesArray: PropTypes.arrayOf().isRequired,
  location: PropTypes.objectOf.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Edit);
