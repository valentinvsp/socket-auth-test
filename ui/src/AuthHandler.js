import React, { useState } from 'react'
import axios from 'axios';

const AuthHandler = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = {
                user,
                pass,
			};
			const response = await axios.post('login', data);
            console.log('res is:', response);
            const token = response.data.accessToken;
            localStorage.setItem('token', token);
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{width: 'fit-content', marginLeft: 'auto'}}>
                <label htmlFor="user">User:</label>
                <input
                    id="user"
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="pass">Pass:</label>
                <input
                    id="pass"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <button type="submit">LOGIN</button>
                <button onClick={handleLogout}>LOGOUT</button>
            </form>
        </div>
    )
}

export default AuthHandler
