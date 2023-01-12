import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  deleteExpense({ target: { id } }) {
    const { expenses, dispatch } = this.props;
    const deletion = expenses.filter((obj) => obj.id !== Number(id));
    dispatch(deleteExpense(deletion));
  }

  editExpense({ target: { id } }) {
    const { history } = this.props;
    console.log(id);
    history.push('/editar', {
      id,
    });
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses.map((obj) => (
            <tr key={ obj.description }>
              <td key={ obj.description }>{ obj.description }</td>
              <td>{ obj.tag }</td>
              <td>{ obj.method }</td>
              <td>{ Number(obj.value).toFixed(2) }</td>
              <td>{ obj.exchangeRates[obj.currency].name }</td>
              <td>{ Number(obj.exchangeRates[obj.currency].ask).toFixed(2) }</td>
              <td>
                { Number(obj.value * obj.exchangeRates[obj.currency].ask).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  id={ obj.id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.deleteExpense }
                >
                  Excluir
                </button>
                <button
                  id={ obj.id }
                  type="button"
                  data-testid="edit-btn"
                  onClick={ this.editExpense }
                >
                  Editar despesa
                </button>
              </td>
            </tr>)) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Table));
