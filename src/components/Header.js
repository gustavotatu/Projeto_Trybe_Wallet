import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailState } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ emailState }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
});

Header.propTypes = {
  emailState: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
