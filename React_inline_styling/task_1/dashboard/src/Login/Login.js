import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
  return (
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <form>
          <label className={css(styles.form)} htmlFor="email">Email:</label>
          <input className={css(styles.form, styles.border)} type="email" id="email" name="email" />
          <label className={css(styles.form)} htmlFor="password">Password:</label>
          <input className={css(styles.form, styles.border)} type="password" id="password" name="password" />
          <button className={css(styles.button)} type="submit">OK</button>
        </form>
      </div>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: '40px',
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
  },
  form: {
    fontWeight: 'bold',
    display: 'inline-block',
    marginRight: '10px',
  },
  border: {
    border: '1px solid #ccc',
  }
})
export default Login;
