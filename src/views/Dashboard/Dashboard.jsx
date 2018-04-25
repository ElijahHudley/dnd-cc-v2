import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

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
    console.log("Dashboard constructor", props);

    this.state = {
      characters: this.props.characters
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
  }

  componentWillUpdate(nextProps, nextState){
    console.log('CHECKING TO SEE IF DASHBOARD componentWillUpdate', nextProps, nextState);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('CHECKING TO SEE IF DASHBOARD shouldComponentUpdate', nextProps, nextState);
  //   return true;
  // }

  componentWillReceiveProps(nextProps){
    console.log('CHECKING TO SEE IF DASHBOARD componentWillReceiveProps', nextProps);
  }


  componentWillMount(){
    console.log('CHECKING TO SEE IF DASHBOARD componentWillMount', this.props.location);


    this.updateCharacterList.bind(this);
    console.log('Dashboard props', this);
  }

  componentDidMount(){
    console.log('CHECKING TO SEE IF DASHBOARD componentDidMount');
    // if(this.props.location.state){
    //   var character = this.props.location.state.character;
    //   this.updateCharacterList(character);
    // }
  }

    updateCharacterList(character){
      var characters = this.state.characters;
      var found = false;

      for(var c in characters){
        if(character.id === characters[c].id){
          console.log('FOUND EXISTING CHAARAACTER', characters[c].id);
          characters[c] = character;
          found = true;
        }
      }

      if(!found){
        characters.push(character);
      }

      console.log('updateCharacterList', character.id, characters);
      this.setState({characters: characters});
      this.forceUpdate();
    }

    forceUpdate(callback){
      console.log('forceUpdate');

    }


    callback(){
      console.log('FOURCE UPDATE NOAW!');
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

    OpenExistingCharacter(item){
      console.log('OpenExistingCharacter', item);

      if(item === undefined){
        item = {};
      }

      var characters = this.state.characters;

      this.props.history.push({
        pathname: '/Create',
        search: '', //?query=abc
        state: { character: item, characters: characters}
      });
    }

      
    handleSearch() {
        //window.location = "/Create";
        
        this.props.history.push('/Create');
    }


    render() {
      let characterOptions = this.state.characters.map((item, i) =>
      {return <div key={i} id={i}>
        <Col lg={3} sm={6}>
          <CharacterCard
            shouldHideBtn={false}
            OpenExistingCharacter={(item) => this.OpenExistingCharacter(item)}
            character={item}
            cardText="Character"
            cardValue={i}
            name={item.name}
            charClass={item.charClass}
            avatar={item.avatar}
            cardSmallIcon={<i className="fa fa-user"></i>}
            statsIconText={i}/>
        </Col></div> })


        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                        <CharacterCard
                            shouldHideBtn={true}
                            OpenExistingCharacter={() => this.handleSearch()}
                            cardClass={"add-new"}
                            name="New Character"
                            avatar={avatarTemp}
                            cardSmallIcon={<i className="fa fa-plus"></i>}
                            />
                        </Col>

                        {characterOptions}

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
