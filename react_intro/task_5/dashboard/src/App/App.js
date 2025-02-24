import './App.css';
import { getFullYear, getFooterCopy } from "../utils/utils"
import React from 'react';

function App() {

  const isIndex = true

  const currentYear = getFullYear();
  const footerText = getFooterCopy(isIndex);
  return (
    <div className="App">
      <header className="App-header">
        <img src={require("../assets/close-icon.png")} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
      <body className="App-body">
        <p>Login to access the full dashboard</p>
        <label for="email">Email:</label>
        <input type="email" id="email"></input>
        <label for="password">Password:</label>
        <input type="password" id="password"></input>
        <button>OK</button>
      </body>
      <footer className="App-footer">
        <p>Copyright {currentYear} - {footerText}</p>
      </footer>
    </div>
  );
}

export default App;
