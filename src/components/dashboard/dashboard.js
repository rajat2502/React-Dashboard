import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './styles';
import { Button } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 22,
      fontWeight: "bolder"
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);


class DashboardComponent extends Component {

    state = {
        data: [],
        response: [],
        fromDate: '',
        toDate: '',
        loading: true,
        keyword: ''
    }

    handleChange = e => {
        const { name, value } = e.target;
        const { response } = this.state;
        if(name === 'keyword') {
            const newData = response.filter(item => {
                console.log(item.name, value);
                if(item.name.toLowerCase().includes(value.toLowerCase()) || item.owner.login.toLowerCase().includes(value.toLowerCase()) || item.created_at.toLowerCase().includes(value.toLowerCase()) || item.updated_at.toLowerCase().includes(value.toLowerCase()) || item.id.toString().toLowerCase().includes(value.toLowerCase()) || item.stargazers_count.toString().toLowerCase().includes(value.toLowerCase())) {
                    return true
                }
            })
            this.setState({
                data: newData
            })
        }
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        const { response, fromDate, toDate } = this.state;
        e.preventDefault();
        if(fromDate!=='' && toDate !== '') {
            const newData = response.filter(item => item.created_at.split('T')[0] > fromDate && item.created_at.split('T')[0] < toDate);
            this.setState({
                data: newData
            })
        }
    }

    componentDidMount() {
        let url = 'https://api.github.com/search/repositories?q=stars:%3E1+&sort=stars&order=desc&type=Repositories'
            fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.items,
                response: data.items,
                loading: false
            }))
            .catch(err => console.log(err))
    }

    render() {

        const { classes } = this.props;
        const { data, fromDate, toDate, loading, keyword } = this.state;

        return (
            <main className={classes.main}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                        <Typography component="h1" variant="h6" className={classes.dashboardHead}>
                        Dashboard
                        </Typography>
                        <Link to="/profile" className={classes.profileLink}>
                            <Button color="inherit">Profile</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                {
                    !loading ? 
                    
                    <div>
                        <div className={classes.dashboardFunction}>
                            <form className={classes.form} onSubmit={this.handleSubmit}>
                                <TextField
                                    id="date"
                                    label="Created from"
                                    type="date"
                                    className={classes.textField}
                                    name="fromDate"
                                    value={fromDate}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <TextField
                                    id="date"
                                    label="Created to"
                                    type="date"
                                    className={classes.textField}
                                    name="toDate"
                                    value={toDate}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <Button type="submit" variant="contained" className={classes.submit} color="primary">Search</Button>
                            </form>
                            <TextField 
                                id="search-keyword"
                                label="Search Keyword"
                                className={classes.searchKeyword}
                                name="keyword"
                                value={keyword}
                                onChange={this.handleChange}
                            />
                        </div>

                        {
                            data.length ? 
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                    <StyledTableCell>Id</StyledTableCell>
                                    <StyledTableCell>Repo Name</StyledTableCell>
                                    <StyledTableCell>Owner</StyledTableCell>
                                    <StyledTableCell>Created on</StyledTableCell>
                                    <StyledTableCell>Updated on</StyledTableCell>
                                    <StyledTableCell>Stars</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.data.map(item => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell component="th" scope="row">
                                        {item.id}
                                        </StyledTableCell>
                                        <StyledTableCell >{item.name}</StyledTableCell>
                                        <StyledTableCell>{item.owner.login}</StyledTableCell>
                                        <StyledTableCell>{item.created_at.split('T')[0]}</StyledTableCell>
                                        <StyledTableCell>{item.updated_at.split('T')[0]}</StyledTableCell>
                                        <StyledTableCell>{item.stargazers_count}</StyledTableCell>
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            : 
                            <p className={classes.noItems}>Sorry, No Items to display</p>
                        }
                    </div>
                    : 
                    <img src="https://career.alliedvision.com/persis/images_avt/gicccccphy.gif" alt="loader" className={classes.loader} />
                }
            </main>
        )
    }

}

export default withStyles(styles)(DashboardComponent);