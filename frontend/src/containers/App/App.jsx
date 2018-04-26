import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";
import imagine from 'assets/img/bg.png';
import Dashboard from 'views/Dashboard/Dashboard';

import appRoutes from 'routes/app.jsx';


class App extends Component {
    constructor(props){
      console.log('App props', props)
        super(props);

        this.state = {
          characters: [],
          response: ''
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }
 
    async callApi(){
      const response = await fetch('/api/createchar', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({text: 'adsfawefaf', complete: true})
      }); 
 
       const body = await response.json();
       if (response.status !== 200) throw Error(body.message);
 
        return body;
    } 
    
    // async callApiHello(){
    //   const response = await fetch('/api/hello', {
    //     method: 'get',
    //     headers: {'Content-Type': 'application/json'},
    //   }); 
 
    //    const body = await response.json();
    //    if (response.status !== 200) throw Error(body.message);
 
    //     return body;
    // } 

    componentDidMount(){
      console.log('APP Start!! componentDidMount', this.state, Object.keys(appRoutes), appRoutes);
      var self = this;

    //   this.callApi()
    //   .then(function(res){
    //     console.log('before callApi', res);
    //     self.setState({ response: res })
    //     console.log('APP then!! callApi', self.state);
    //   })
    //   .catch(function(err){
    //     console.log('callApi APP SAY NO!', err); 
    //   }); 
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
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel" style={Background}>
                        <Header {...this.props}/>
                            <Switch>
                                {
                                    appRoutes.map((prop,key) => {
                                      console.log('appRoutes props', prop, key);
                                        if(prop.name === '"Create New Character"'){
                                          prop.component['data'] = 'NEW STUFF';
                                        }
                                        if(prop.redirect) return (<Redirect from={prop.path} to={prop.to} key={key}/>);
                                        if(prop.name === 'Dashboard') return (<Route key={key} path={prop.path} render={(props) => <Dashboard {...props} characters={this.state.characters}/>} />);
                                        return (<Route path={prop.path} component={prop.component} key={key}/>);
                                    })
                                }
                            </Switch>
                        <Footer />
                    </div>
                </div>
        );
    }
}

export default App;
