import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailValue: '',
      passwordValue: '',
      invalidLogin: true,
    };

    this.saveInputs = this.saveInputs.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
  }

  saveInputs = async ({ target }) => {
    const { name, value } = target;
    if (name === 'email') {
      this.setState({
        emailValue: value,
      });
    }
    if (name === 'password') {
      this.setState({
        passwordValue: value,
      });
    }
    this.checkValidation();
  };

  checkValidation = () => {
    const { emailValue, passwordValue } = this.state;
    const minPasswordLength = 5;
    const validEmail = emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const validPassword = passwordValue.length >= minPasswordLength;
    if (validEmail && validPassword) {
      this.setState({
        invalidLogin: false,
      });
    } else {
      this.setState({
        invalidLogin: true,
      });
    }
  };

  render() {
    const { invalidLogin, emailValue } = this.state;
    const { history, dispatch } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div>
            Email
            <br />
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.saveInputs }
            />
          </div>
          <br />
          <div>
            Senha
            <br />
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.saveInputs }
            />
          </div>
          <br />
          <div>
            <input
              type="submit"
              name="login-button"
              value="Entrar"
              disabled={ invalidLogin }
              onClick={ (event) => {
                dispatch(loginAction(emailValue));
                history.push('/carteira');
                event.preventDefault();
              } }
            />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Login);
