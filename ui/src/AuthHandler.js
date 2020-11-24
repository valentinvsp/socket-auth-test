import React, { useState } from 'react';
import { logIn, logOut } from './redux/actions';
import { connect } from 'react-redux';

const AuthHandler = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.logIn({ user, pass });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ width: 'fit-content', marginLeft: 'auto' }}>
                <label htmlFor="user">User:</label>
                <input id="user" type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="pass">Pass:</label>
                <input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button type="submit">LOGIN</button>
            </form>
            <button onClick={props.logOut}>LOGOUT</button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.authReducer.authenticated,
});

const mapDispatchToProps = {
    logIn,
    logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHandler);
