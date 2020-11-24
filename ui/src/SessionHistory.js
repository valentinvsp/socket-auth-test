import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function SessionHistory({ data }) {
    const [sessionData, setSessionData] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        const socket = io('http://localhost:4001/', {
            withCredentials: true,
            extraHeaders: {
                'my-custom-header': 'abcd',
            },
            query: { token: localStorage.getItem('token') },
            reconnection: true,
            reconnectionAttempts: 5,
            transports: ['websocket'],
            reconnectionDelay: 1000,
            // autoConnect: false,
        });
        socket.on('new data', (data) => {
            setSessionData((d) => [...d, data]);
        });
        socket.on('connect', () => {
            console.log('connected');
            console.log(socket.connected);
        });
        socket.on("connect_error", () => {
            // socket.auth.token = "abcd";
            // socket.connect();
          });
        socket.on('reconnect', () => {
            console.log('reconnecting...');
        })
        socket.on('connection', () => {
            console.log('connecting...');
        })
        socket.on('disconnect', () => {
            console.log('disconnected');
            console.log(socket.disconnected);
        });
        return () => {
            console.log('unmounting...');
            socket.disconnect();
        };
    }, []);

    

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell align="right">Inspection Time</TableCell>
                            <TableCell align="right">Product Name</TableCell>
                            <TableCell align="right">Check Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessionData &&
                            sessionData.length > 0 &&
                            sessionData
                                .slice(-10)
                                .reverse()
                                .map(({ id, product, ok, time }) => (
                                    <TableRow key={id} style={{ backgroundColor: ok ? '#0080003b' : '#ff00007a' }}>
                                        <TableCell component="th" scope="row">
                                            {id}
                                        </TableCell>
                                        <TableCell align="right">{new Date(time).toUTCString()}</TableCell>
                                        <TableCell align="right">{product}</TableCell>
                                        <TableCell align="right">{ok ? 'OK' : 'BAD!'}</TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default SessionHistory;
