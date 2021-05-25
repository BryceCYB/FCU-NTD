import React, { useState, useEffect } from 'react';
import './About.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import firebase from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import * as ReactBootStrap from 'react-bootstrap';

const columns = [
    { id: 'date', label: 'Date'},
    { id: 'message', label: 'Message'},
    { id: 'author', label: 'Author'}
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 550,
    },
});

export default function About() {
    const [rows, setRows] = useState([]);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { currentUser } = useAuth();
    const [error, setError] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const customColumnStyle = { maxWidth: '520px' };
    
    useEffect(() => {
        if (currentUser) {
            setError("");
            const announcementRef = firebase.database().ref("Announcement");
            announcementRef.on("value", (snapshot) => {
                const data = snapshot.val();
                setRows(data.reverse()); 
            })
        } else {
            setError("⚠ Please login first.");
        }
    }, [currentUser]);

    return (
        <div className="about">
            <Paper className={classes.root} style={{backgroundColor:'#c5c6c7'}}>
                <h1 style={{padding:'10px'}}>Course registration system announcement 🚀</h1>
                <TableContainer className={classes.container} >
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align} style={customColumnStyle}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ); 
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length - 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {error && <ReactBootStrap.Alert className="error-msg">{error}</ReactBootStrap.Alert>}
        </div>
    );
}
