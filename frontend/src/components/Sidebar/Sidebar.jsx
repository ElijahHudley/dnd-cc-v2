import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import { Router, Route, browserHistory } from 'react-router';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import imagine from 'assets/img/sidebar-3.jpg';
import logo from 'assets/img/logo.png';

import appRoutes from 'routes/app.jsx';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth
        }

        console.log('sidebar props!', props);
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    openwindow(){
        var self = this;
        var childWindow = window.open('http://localhost:5000/auth/google','window name','menubar', 'width=800, height=600');
        
        var windowPoller=setInterval(function(){
            //console.log('childwindow Open', childWindow, checkChildURL(childWindow)); 
            try{
                if(checkChildURL(childWindow).includes(window.location.hostname) || childWindow.closed){
                    var url =   childWindow.document.URL;
                    var acToken =   gup(url, 'access_token');
                    var tokenType = gup(url, 'token_type');
                    var expiresIn = gup(url, 'expires_in');
                    var code = gup(url, 'code');
                    
                    console.log(url, acToken, tokenType, expiresIn, code);
                    //self.props.loginRequest(code)
                    myStopFunction();
                }
            }catch(e){
              myStopFunction();  
            } 
        }, 200);

        function myStopFunction() {
            clearInterval(windowPoller);
            setTimeout(function() {
               childWindow.close();
            }, 500); 
        }

        //credits: http://www.netlobo.com/url_query_string_javascript.html
        function gup(url, name) {
            name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
            var regexS = "[\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            if( results == null )
                return "";
            else
                return results[1];
        }

        function checkChildURL(windowObject) {
            var url = "error";
            try {
                url  = childWindow.location.href;
            } catch(e) {
                //nah
            }
            return url;
        }
    }
 
    render(){
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
                <div className="sidebar-background" style={sidebarBackground}></div>
                    <div className="logo">
                        <a href="" className="simple-text logo-mini">
                            <div className="logo-img">
                                <img src={logo} alt="logo_image"/>
                            </div>

                        </a>
                        <a href="" className="simple-text logo-normal">
                            @Superhiro20
                        </a>
                    </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        { this.state.width <= 991 ? (<HeaderLinks />):null }
                        {
                            appRoutes.map((prop,key) => {
                                if(!prop.redirect)
                                    return (
                                        <li className={prop.upgrade ? "active active-pro":this.activeRoute(prop.path)} key={key}>
                                            <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                <i className={prop.icon}></i>
                                                <p>{prop.name}</p>
                                            </NavLink>
                                        </li>
                                    );
                                return null;
                            })
                        }
{/* href={this.props.loginurl} */}
                        <li className={"active active-pro loginbtn"} key={4}>
                            <a className="nav-link active" onClick={() => this.openwindow()}> 
                                <i className={"fa fa-google"}></i>
                                <p>{'Login'}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
