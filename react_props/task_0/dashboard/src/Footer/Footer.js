import React from "react";
import './Footer.css';
import { getFullYear, getFooterCopy } from "../utils/utils"

function Footer() {

  const isIndex = true

  const currentYear = getFullYear();
  const footerText = getFooterCopy(isIndex);
  return (
    <footer className="App-footer">
      <p>Copyright {currentYear} - {footerText}</p>
    </footer>
  );
}

export default Footer;
