import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer">
                <Grid>
                    <p className="copyright pull-left">
                        &copy; {(new Date()).getFullYear()} <a href="ElijahHudley.github.io">ElijahHudley.github.io</a>
										</p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;
