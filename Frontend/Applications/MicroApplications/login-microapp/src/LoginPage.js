import React from 'react';

const LoginPage = ({ userId, theme }) => {
  return (
    <div>
      <h2>Login Page</h2>
      <p>User ID: {userId}</p>
      <p>Theme: {theme}</p>
      <div id='LoginPageId'>MicroApp</div>
    </div>
      );
};


export default LoginPage;
