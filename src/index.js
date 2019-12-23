import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import LoginComponent from './components/login/login';
import SignUpComponent from './components/signup/signup';
import DashboardComponent from './components/dashboard/dashboard';
import ProfileComponent from './components/Profile/profile';
import PrivateRoute from './components/PrivateRoute'

firebase.initializeApp({
    apiKey: "AIzaSyBo4FSLDGqyagzCKOXKGCkahPeew7oRZ-Q",
    authDomain: "dashboard-b3a34.firebaseapp.com",
    databaseURL: "https://dashboard-b3a34.firebaseio.com",
    projectId: "dashboard-b3a34",
    storageBucket: "dashboard-b3a34.appspot.com",
    messagingSenderId: "769089729203",
    appId: "1:769089729203:web:ce2eeec5a9e72bb1eeb6c6",
    measurementId: "G-323PTL0C2E"
});

const routing = (
    <Router>
        <Switch>
            <PrivateRoute path="/" exact component={LoginComponent} />
            <PrivateRoute path="/signup" component={SignUpComponent} />
            <PrivateRoute path="/dashboard" component={DashboardComponent} />
            <PrivateRoute path="/profile" component={ProfileComponent} />
        </Switch>
    </Router>
)

ReactDOM.render( routing, document.getElementById('root'));