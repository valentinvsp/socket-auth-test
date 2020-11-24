import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { logIn } from './redux/actions';
import { connect } from 'react-redux';

const LoginForm = (props) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.logIn({ user, pass });
    };

    return (
        <>
            <Dialog open={props.open} onClose={props.toggleModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label="Password"
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary">
                            LOG IN
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.toggleModal} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.authReducer.authenticated,
});

const mapDispatchToProps = {
    logIn,
};

export default connect(null, mapDispatchToProps)(LoginForm);
