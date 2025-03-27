import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className={css(styles.header)}>
      <img className={css(styles.img)} src={logo} alt="logo" />
      <h1 className={css(styles.h1)}>School dashboard</h1>
    </header>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: '6px',
    borderBottom:'4px solid #cf4550',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    height: '240px',
  },
  h1: {
    padding: '10px',
    fontSize: '40px',
    color: '#cf4550',
  }
})

export default Header;
