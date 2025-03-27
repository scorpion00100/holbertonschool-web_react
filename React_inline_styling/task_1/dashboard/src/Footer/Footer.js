import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';

function Footer({ isIndex }) {
  return (
    <footer>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(isIndex)}
      </p>
    </footer>
  );
}

export default Footer;
