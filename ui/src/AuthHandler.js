import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { logIn, logOut } from './redux/actions';
import { connect } from 'react-redux';
import LoginForm from './LoginForm'

const AuthHandler = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    if (props.isLoggedIn) return <Button variant="contained" color="secondary" onClick={props.logOut}>LOGOUT</Button>;

    return (
        <>
            <Button variant="contained" color="primary" onClick={toggleModal} >LOGIN</Button>
            {ReactDOM.createPortal( <LoginForm open={modalIsOpen} toggleModal={toggleModal} />, document.querySelector('#portal'))}
        </>
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
