import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import AppContext from '../App/AppContext';

class Header extends React.Component {
    render() {
        return (
            <>
                <header className={css(styles.appHeader)}>
                    <img src={this.props.src} alt={this.props.alt} className={css(styles.appHeaderImg)}/>
                    <h1>{this.props.text}</h1>
                </header>
                {this.context.user.isLoggedIn ? (
                    <section id='logoutSection'>
                        Welcome <strong>{this.context.user.email}</strong> <a onClick={() => {this.context.logOut()}}><em>(logout)</em></a>
                    </section>
                ) : null}
                
            </>
        );
    }
}
Header.contextType = AppContext;

const styles = StyleSheet.create({
    appHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '1.2rem',
        color: '#e11d3f',
        bordeBottom: 'solid #e11d3f'
    },
      
    appHeaderImg: {
        width: 250
    }
});

export default Header;
