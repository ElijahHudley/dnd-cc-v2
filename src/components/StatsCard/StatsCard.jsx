import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class StatsCard extends Component{
    render(){
        return (
            <div className={"card card-stats " + this.props.cardClass} >
                <div className="content">
                    <Row>
                        <Col xs={5}>
                            <div className="icon-big text-center icon-warning">
                                {this.props.cardBigIcon}
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className="numbers">
                                <p>{this.props.cardText}</p>
                                {this.props.cardValue}
                            </div>
                        </Col>
                    </Row>
                    <div className="footer">
                        <hr />
                        <div className="stats">
                            {this.props.cardSmallIcon}{" "}{this.props.cardIconText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatsCard;
