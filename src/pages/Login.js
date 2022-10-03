import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DRINKS_TOKEN_KEY, MEALS_TOKEN_KEY, USER_KEY } from '../utils/globalVariables';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const history = useHistory();

  const [input, setInput] = useState({ email: '', password: '' });

  const validateForm = () => {
    const { email, password } = input;
    const validateEmail = email.match(/\S+@\S+\.\S+/);
    const validatePassword = password.length > MIN_PASSWORD_LENGTH;
    return !(validateEmail && validatePassword);
  };

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(USER_KEY, JSON.stringify({ email: input.email }));
    localStorage.setItem(MEALS_TOKEN_KEY, 1);
    localStorage.setItem(DRINKS_TOKEN_KEY, 1);
    history.push('/meals');
  };

  useEffect(() => {
    validateForm();
  });

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email-input">
        <input
          type="email"
          name="email"
          onChange={ handleChange }
          data-testid="email-input"
          value={ input.email }
          id="email-input"
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          name="password"
          onChange={ handleChange }
          data-testid="password-input"
          value={ input.password }
          id="password-input"
        />
      </label>
      <button
        disabled={ validateForm() }
        data-testid="login-submit-btn"
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}
// ;
export default Login;
