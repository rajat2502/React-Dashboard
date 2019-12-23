import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import styles from './styles'

class ProfileComponent extends Component {

    state = {
        email: '',
        name: '',
        phone: '',
        age: '',
        image: 'https://image.flaticon.com/icons/png/512/149/149071.png',
        edit: false
    }
    
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    toggleEdit = () => {
        const editState = this.state.edit;
        this.setState({
            edit: !editState
        })
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({image: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }

    render() {

        const { classes } = this.props;
        const { email, name, phone, age, edit, image } = this.state;

        return (
            <Fragment>
                <AppBar position="static" color="primary">
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                        <Typography component="h1" variant="h6" className={classes.profileHead}>
                            Profile
                        </Typography>
                        <Link to="/dashboard" className={classes.dashboardLink}>
                            <Button color="inherit">Dashboard</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                <main className={classes.main}>
                    <CssBaseline></CssBaseline>
                    <Paper className={classes.paper}>
                        {
                            edit ?
                            <div className={classes.userDetailsDiv}>
                                <Typography component="h1" variant="h4">Your Profile</Typography>
                                <img src={image} title="user-image" alt="user-image" className={classes.userImage} />
                                <Typography component="h3" variant="h5" className={classes.userDetail}>
                                    Name: {name}
                                </Typography>
                                <Typography component="h3" variant="h5" className={classes.userDetail}>
                                    Email: {email}
                                </Typography>
                                <Typography component="h3" variant="h5" className={classes.userDetail}>
                                    Age: {age}
                                </Typography>
                                <Typography component="h3" variant="h5" className={classes.userDetail}>
                                    Phone-Number: {phone}
                                </Typography>
                                <Button color="primary" fullWidth variant="contained" className={classes.submit} onClick={this.toggleEdit}>Edit</Button>
                            </div>
                            :
                            <form className={classes.form}>
                                <Typography component="h1" variant="h4">Create Your Profile</Typography>
                                <FormControl fullWidth required margin="normal">
                                    <label>Enter your profile picture:</label>
                                    <input type="file" name="image" onChange={this.onImageChange}/>
                                </FormControl>
                                <FormControl required fullWidth margin='normal'>
                                    <InputLabel htmlFor='email'>Enter Your Email</InputLabel>
                                    <Input autoComplete='email' id='email' name="email" value={email} onChange={this.handleChange} />
                                </FormControl>
                                <FormControl required fullWidth margin='normal'>
                                    <InputLabel htmlFor='name'>Enter Your Name</InputLabel>
                                    <Input id='name' name="name" value={name} onChange={this.handleChange} />
                                </FormControl>
                                <FormControl required fullWidth margin='normal'>
                                    <InputLabel htmlFor='phone'>Enter Your Phone number</InputLabel>
                                    <Input id='phone' type="number" name="phone" value={phone} onChange={this.handleChange} />
                                </FormControl>
                                <FormControl required fullWidth margin='normal'>
                                    <InputLabel htmlFor='age'>Enter Your Age</InputLabel>
                                    <Input id='age' type="number" name="age" value={age} onChange={this.handleChange} />
                                </FormControl>
                                <Button  color="primary" fullWidth variant="contained" className={classes.submit} onClick={this.toggleEdit}>Save</Button>
                            </form>
                        }
                    </Paper>
                </main>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ProfileComponent);