import React from 'react';
import ReactDOM from 'react-dom';

// import {HashRouter, browserHistory, Route, Switch} from 'react-router-dom';
// import { Router, Route, browserHistory } from 'react-router';

import { BrowserRouter, Link, Route } from 'react-router-dom';
import App from 'containers/App/App.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';


ReactDOM.render((

    <BrowserRouter>
        <Route path="/" name="Home" component={App}/>
    </BrowserRouter>

),document.getElementById('root'));
