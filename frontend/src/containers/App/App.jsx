import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import Button from 'elements/CustomButton/CustomButton.jsx';

import {style} from "variables/Variables.jsx";
import imagine from 'assets/img/bg.png';
import Dashboard from 'views/Dashboard/Dashboard';

import appRoutes from 'routes/app.jsx';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
          characters: [],
          loginurl: ''
        }

        //console.log('App props', props, this.state)
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async callApi(api){
        const response = await fetch(api, {
            method: 'get',
            headers: {'Content-Type': 'application/json',
                            'Accept': 'application/json'},
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
 
        return body;
    }

    // loginRequest(code){
    //     var self = this;

    //     this.callApi('/auth/google/callback')
    //   .then(function(res){
    //     self.setState({loginurl: res.url});
    //     //console.log('before callApi', self.state.loginurl);
    //   })
    //   .catch(function(err){
    //     console.log('callApi APP SAY NO!', err); 
    //   }); 
    // }
     
    componentDidMount(){
        var self = this;
        // this.callApi('/api/getallchar').then(function(data){
        //     console.log('got data', data);
        //     self.setState({characters: [data]})
        // });
        console.log('APP Start!! componentDidMount', this.state, Object.keys(appRoutes), appRoutes);
    } 

    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }

    saveThis(){
      console.log('HEY IM WALKING HERE!');
    }

    render() {
      const Background = {
          backgroundImage: 'url(' + imagine + ')'
      };

        return (
                <div className="wrapper">
                    <Sidebar {...this.props }  loginRequest={(code) => this.loginRequest(code)}/>

                    <div id="main-panel" className="main-panel" style={Background}>
                        <Header {...this.props}/>

                        <Switch>{
                            appRoutes.map((prop,key) => {
                                //console.log('appRoutes props', prop, key);
                                if(prop.name === '"Create New Character"'){
                                    prop.component['data'] = 'NEW STUFF';
                                }
                                
                                if(prop.redirect) {
                                    return (<Redirect from={prop.path} to={prop.to} key={key}/>);
                                }
                                
                                if(prop.name === 'Dashboard') {
                                    return (<Route key={key} path={prop.path} render={(props) => <Dashboard {...props} characters={this.state.characters}/>}/>);
                                }
                                        
                                return (<Route path={prop.path} component={prop.component} key={key}/>);
                            })
                        }</Switch>

                        <Footer />
                    </div>
                </div>
        );
    }
}

export default App;
