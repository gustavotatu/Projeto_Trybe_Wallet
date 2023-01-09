import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      finalExpenses: 0,
    };
  }

  componentDidUpdate(previousProps) {
    const { expenses } = this.props;
    const currencies = expenses.map((obj) => obj.currency);
    const values = expenses.map((obj) => obj.value);
    const finalValues = [];
    console.log(expenses);
    console.log(expenses[0]);
    for (let i = 0; i < expenses.length; i += 1) {
      finalValues.push(expenses[i].exchangeRates[currencies[i]].ask * values[i]);
    }
    const result = finalValues.reduce((acc, cur) => acc + cur, 0);
    if (previousProps.expenses !== expenses) {
      this.setState({
        finalExpenses: result.toFixed(2),
      });
    }
  }

  render() {
    const { emailState } = this.props;
    const { finalExpenses } = this.state;
    return (
      <div>
        <p data-testid="email-field">{ emailState }</p>
        <p data-testid="total-field">{ finalExpenses }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  emailState: propTypes.string.isRequired,
  expenses: propTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
