import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import uuid from 'uuid/v4';

export class CharacterCard extends Component{
    constructor(props){
      super(props);
      this.hide='';
      this.props.shouldHideBtn ? this.hide='hidden' : this.hide='';
    }

    HandleClickEvent(){
      console.log('CharacterCard HandleClickEvent');
    }

    HandleClickDelEvent(){
      console.log('CharacterCard HandleClickEvent');
    }

    HandleClickEditEvent(){
      console.log('CharacterCard HandleClickEvent');
    }

    render(){
        return (
            <div className={"card card-stats"}  onClick={() => this.props.ClickEvent()}>
                <div className={"content "  + this.props.cardClass}>
                    <Row>
                        <Col xs={5}>
                            <div className={" image"}>
                                <img src={this.props.avatar} alt="..."/>
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className="numbers">
                            <h3 className="pullRight">{this.props.name}</h3>
                                <p className="pullRight">{this.props.charClass}</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="footer">
                        <hr />
                        <div className="stats">
                            {this.props.cardIconText}

                            <Button className={this.hide + ' btn-fill btn btn-info'} onClick={() => this.HandleClickEditEvent.bind(this)} bsSize="sm" bsStyle="info" pullRight={true} fill={true} type="submit">
                              EDIT
                            </Button>

                            <Button className={this.hide + ' btn-fill btn btn-info'} onClick={() => this.HandleClickDelEvent.bind(this)} bsSize="sm" bsStyle="info" pullRight={true} fill={true} type="submit">
                              DELETE
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterCard;
