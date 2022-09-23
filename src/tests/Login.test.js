import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('tests on Login screen', () => {
  it('should have three elements on the screen', () => {
    renderWithRouter(<App />);

    const loginInputEmail = screen.getByRole('textbox');
    const loginInputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });
    expect(loginInputPassword).toBeDefined();
    expect(loginInputEmail).toBeDefined();

    expect(loginButton).toBeDefined();
    expect(loginButton).toBeDisabled();
  });

  it('should turn button enabled when form is rightly filled', () => {
    renderWithRouter(<App />);

    const loginInputEmail = screen.getByRole('textbox');
    const loginInputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });

    userEvent.type(loginInputEmail, 'trybe@teste.com');
    userEvent.type(loginInputPassword, 'umaSenha');

    expect(loginInputEmail).toHaveValue('trybe@teste.com');
    expect(loginInputPassword).toHaveValue('umaSenha');
    expect(loginButton).toBeEnabled();
  });

  it('should redirect to "/meals" when button is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const loginInputEmail = screen.getByRole('textbox');
    const loginInputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });

    userEvent.type(loginInputEmail, 'tryber@teste.com');
    userEvent.type(loginInputPassword, 'umaSenha');
    userEvent.click(loginButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
