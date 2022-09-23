import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email-input">
        <input type="email" data-testid="email-input" id="email-input" />
      </label>
      <label htmlFor="password-input">
        <input type="password" data-testid="password-input" id="password-input" />
      </label>
      <button data-testid="login-submit-btn" type="submit">Enter</button>
    </form>
  );
}

export default Login;
