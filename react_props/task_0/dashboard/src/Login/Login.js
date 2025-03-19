import React from "react";
import './Login.css';

function Login() {

  return (
    <>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email"></input>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password"></input>
      <button>OK</button>
    </>
)}

export default Login;
