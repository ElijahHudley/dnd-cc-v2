import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
    async callApi(api){
        var self = this;

        const response = await fetch(api, {
            method: 'get',
            headers: {'Content-Type': 'application/json',
                            'Accept': 'application/json'},
            data: {userid: this.props.location.query.id}
        }); 

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
 
        return body;
    }

    clickbtn(ev){
       console.log('clickbtn');
       console.log('location', this.props.location);

       var self = this;

       self.callApi('/api/hello').then(function(data){
            console.log('got data', data);
        }).then(function(data){
            console.log('APP Start!! componentDidMount', self.state);
        });
    }



    render() {
        return (
            <div className="content">
               <li className={"active active-pro loginbtn"} key={4}>
                            <div className="nav-link active" onClick={this.clickbtn.bind(this)} href=""> 
                                <i className={"fa fa-google"}></i>
                                <p>{'Login'}</p>
                            </div>
                </li>
            </div>
        );
    }
}

export default UserProfile;
