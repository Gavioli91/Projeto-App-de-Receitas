import React, { useEffect, useState } from 'react';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [enableButton, setSubmitButton] = useState(true);

  const validateForm = () => {
    const { email, password } = input;
    const validateEmail = email.match(/\S+@\S+\.\S+/);
    const validatePassword = password.length >= MIN_PASSWORD_LENGTH;
    if (validateEmail && validatePassword) {
      setSubmitButton(false);
    } else {
      setSubmitButton(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    validateForm();
  });

  return (
    <form>
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
        disabled={ enableButton }
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
