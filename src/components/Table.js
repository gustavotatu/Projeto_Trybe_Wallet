import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      tds: [],
    };
  }

  componentDidUpdate(previousProps) {
    const { expenses } = this.props;
    const result = expenses.map(
      (obj) => [obj.description,
        obj.tag,
        obj.method,
        Number(obj.value).toFixed(2),
        obj.exchangeRates[obj.currency].name,
        Number(obj.exchangeRates[obj.currency].ask).toFixed(2),
        Number(obj.value * obj.exchangeRates[obj.currency].ask).toFixed(2),
        'Real'],
    );
    if (previousProps.expenses !== expenses) {
      console.log(result);
      this.setState({
        tds: [result],
      });
    }
  }

  render() {
    const { tds } = this.state;
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
          <tr>
            <tr>
              { tds !== undefined && tds.map((array) => (
                array.map((value) => (
                  <td key={ value }>{ value }</td>
                ))
              )) }
            </tr>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Table);
