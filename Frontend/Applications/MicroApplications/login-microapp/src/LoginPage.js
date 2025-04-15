import React from 'react';

const LoginPage = ({ userId, theme }) => {
  return (
    <div id = "loginElmId">
      <h2>Login Page</h2>
      <p>User ID: {userId}</p>
      <p>Theme: {theme}</p>
      <div id='LoginPageId'>MicroApp</div>
            <button
              onClick={() =>
                window.launchMicroApp("login", "RegistrationPage", "loginElmId")
              }
            >
              Launch Registration Page
            </button>
    </div>
      );
};


export default LoginPage;
