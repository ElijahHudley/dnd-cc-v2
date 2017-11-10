import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import avatar from "assets/img/color/Aarin.bmp";
import avatarTemp from "assets/img/color/new.png";

import {Card} from 'components/Card/Card.jsx';
import {CharacterCard} from 'components/CharacterCard/CharacterCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from 'variables/Variables.jsx';

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      characters: [
        {name: 'random guy 1', charClass:"random class 1", level:"1", avatar:avatar},
        {name: 'random guy 2', charClass:"random class 2", level:"2", avatar:avatar}
      ]
    };
  }

    updateCharacterList(character){
      var characters = this.state.characters;
      characters.push(character);
      this.setState({characters: characters});
    }

    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }

    HandleClickEvent(){
      console.log('HANDLED CLICK');
      this.props.history.push(`/Create`);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                        <CharacterCard
                            shouldHideBtn={true}
                            ClickEvent={() => this.HandleClickEvent()}
                            cardClass={"add-new"}
                            name="Create New Character"
                            avatar={avatarTemp}
                            cardSmallIcon={<i className="fa fa-plus"></i>}
                            Save={() => this.updateCharacterList.bind(this)}/>
                        </Col>

                        {this.state.characters.map((item, i) =>
                          <div id={i}>
                            <Col lg={3} sm={6}>
                              <CharacterCard
                                shouldHideBtn={false}
                                ClickEvent={() => this.HandleClickEvent()}
                                cardText="Character"
                                cardValue={i}
                                name={item.name}
                                charClass={item.charClass}
                                avatar={item.avatar}
                                cardSmallIcon={<i className="fa fa-user"></i>}
                                statsIconText={i}/>
                            </Col>
                          </div>
                        )}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
