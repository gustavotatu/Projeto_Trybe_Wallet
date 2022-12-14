import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(saveCurrencies());
  }

  render() {
    const { currenciesArray } = this.props;
    return (
      <form>
        <h2>Wallet Form</h2>
        <div>
          <p>Valor da despesa:</p>
          <input type="number" data-testid="value-input" />
        </div>
        <br />
        <div>
          <p>Descrição da despesa:</p>
          <textarea data-testid="description-input" />
        </div>
        <br />
        <div>
          <p>Moeda:</p>
          <select data-testid="currency-input">
            { currenciesArray !== undefined && currenciesArray.map((currency) => (
              <option key={ currency }>{ currency }</option>
            )) }
          </select>
        </div>
        <div>
          <p>Forma de pagamento:</p>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <p>Tag:</p>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesArray: state.wallet.currencies,
});

WalletForm.propTypes = {
  currenciesArray: propTypes.arrayOf.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
