import React, {Component} from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  Tabs,
  Tab
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import CharacterStats from './CharacterStats.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import DropDown from 'elements/CustomDropDown/CustomDropDown.jsx';

import bgImage from "assets/img/bg04.jpg";
import avatar from "assets/img/color/Aarin.bmp";

function importAll(r) {
  return r.keys().map(r);
}

//nice way to get all images from folder
const images = importAll(require.context('assets/img/color', false, /\.(bmp|png|jpe?g|svg)$/));

class CreateCharacter extends Component {
  constructor(props) {
    console.log('props', props);
    super(props);

    this.state = {
      name: "Hiro Yakamora",
      charClass: 'Barbarian',
      aliment: 'Lawful good',
      image: avatar,
      armorClass: 0,
      initiative: 0,
      speed: 0,
      hitPoints: 0,
      level: 1,
      background: '',
      faction: '',
      race: 'Dragonborn',
      exp: 0,
      dci: 0,
      story: {
        personality: '',
        bonds: '',
        flaws: ''
      },
      savingThrows: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      },
      skills: {
        acrobatics: 0,
        athletics: 0,
        sleightofhand: 0,
        stealth: 0,
        arcana: 0,
        history: 0,
        investigation: 0,
        nature: 0,
        religion: 0,
        animalhandling: 0,
        insight: 0,
        medicine: 0,
        perception: 0,
        survival: 0,
        deception: 0,
        intimidation: 0,
        performance: 0,
        persuasion: 0
      }
    };

    this.Name = this.state.name;

    this.charClassesInfo = {
      'Barbarian': {armorClass: 13, hitPoints: 13},
      'Bard': {armorClass: 13, hitPoints: 9},
      'Cleric': {armorClass: 14, hitPoints: 9},
      'Druid': {armorClass: 13, hitPoints: 9},
      'Fighter': {armorClass: 12, hitPoints: 11},
      'Monk': {armorClass: 12, hitPoints: 9},
      'Paladin': {armorClass: 16, hitPoints: 11},
      'Ranger': {armorClass: 12, hitPoints: 11},
      'Rogue': {armorClass: 13, hitPoints: 9},
      'Sorcerer': {armorClass: 12, hitPoints: 7},
      'Warlock': {armorClass: 13, hitPoints: 9},
      'Wizard': {armorClass: 12, hitPoints: 7},
      'Custom': {armorClass: '', hitPoints: ''}
    }

    this.raceInfo = {
      'Dragonborn': {speed: 30, bonus: {strength: 2, charisma: 1}},
      'Dwarf': {speed: 25, bonus: {constitution: 2}},
      'Elf': {speed: 30, bonus: {dexterity: 2}},
      'Half-Elf': {speed: 30, bonus: {charisma: 2}},
      'Half-Orc': {speed: 30, bonus: {strength: 2, constitution: 1}},
      'Halfling': {speed: 25, bonus: {dexterity: 2}},
      'Human': {speed: 30, bonus: {}},
      'Tiefling': {speed: 30, bonus: {intelligence: 1, charisma: 2}},
      'Gnome': {speed: 25, bonus: {intelligence: 2}},
      'Custom': {speed: 0, bonus: {hitPoints: 0}, bonus: {}},
    }
  }

  setImage(index) {
    this.setState({image: images[index]});
  }

  handleNameChange(evt) {
    console.log('handleNameChange', evt.target.value);
    this.setState({name: evt.target.value});
  }

  handleClassChange(evt) {
    var self = this;
    var selected = evt.target.value;
    console.log('handleClassChange', selected);
    this.setState({charClass: selected});
    self.setState({armorClass: this.charClassesInfo[selected].armorClass});
    self.setState({hitPoints: this.charClassesInfo[selected].hitPoints});
  }

  handleRaceChange(evt) {
    var self = this;
    var selected = evt.target.value;
    console.log('handleRaceChange', selected);
    this.setState({race: selected});
    self.setState({speed: this.raceInfo[selected].speed});

    var savingThrows = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    }

    for(var c in Object.keys(this.raceInfo[selected].bonus)){
      var index = Object.keys(this.raceInfo[selected].bonus)[c];

      savingThrows[index] += this.raceInfo[selected].bonus[index];
      this.setState({savingThrows : savingThrows});
    }


  }


  handleAlimentChange(evt) {
    console.log('handleAlimentChange', evt.target.value);
    this.setState({aliment: evt.target.value});
  }

  updateCharacter(ev) {
    console.log('updateCharacter', ev, this.refs);
  }

  calcInitiative(dex){
    var roll = Math.floor(Math.random() * (20 - 1) + 1 + dex);
    this.setState({initiative: roll});

  }

  render() {
    const aliments = [
      "Lawful good","Neutral good","Chaotic good","Lawful neutral","(True) neutral","Chaotic neutral","Lawful evil","Neutral evil","Chaotic evil"
    ]

    const classes = [
      'Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard','Custom'
    ]

    const races = [
      'Dragonborn',
      'Dwarf',
      'Elf',
      'Gnome',
      'Half-Elf',
      'Half-Orc',
      'Halfling',
      'Human',
      'Tiefling',
      'Custom'
    ]

    return (<div className="content">
      <Grid fluid="fluid">
        <Row>
          <Col md={8}>
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
              <Tab eventKey={1} title="Profile">
                <Card title="Character Profile" content={<form > <FormInputs ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-2"]} proprieties={[
                      {
                        label: "Name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Name",
                        disabled: false,
                        onChange: this.handleNameChange.bind(this)
                      }, {
                        label: "Background",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Background"
                      }, {
                        label: "Faction",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Faction"
                      }, {
                        label: "Level",
                        type: "number",
                        bsClass: "form-control",
                        placeholder: "1"
                      }
                    ]}/>

                  <FormInputs ncols={["col-md-3", "col-md-3"]} proprieties={[
                      {
                        label: "EXP Points",
                        type: "Number",
                        bsClass: "form-control",
                        placeholder: "EXP Points"
                      }, {
                        label: "DCI Number",
                        type: "Number",
                        bsClass: "form-control",
                        placeholder: "DCI Number"
                      }
                    ]}/>

                  <Row>
                    <Col md={4}>
                      <DropDown handleChange={() => this.handleAlimentChange.bind(this)} Items={aliments} Title="Aliment"/>
                    </Col>

                    <Col md={4}>
                      <DropDown handleChange={() => this.handleClassChange.bind(this)} Items={classes} Title="Class"/>
                    </Col>

                    <Col md={4}>
                      <DropDown handleChange={() => this.handleRaceChange.bind(this)} Items={races} Title="Race"/>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Personality</ControlLabel>
                        <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder=""/>
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Bonds</ControlLabel>
                        <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder=""/>
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Flaws</ControlLabel>
                        <FormControl rows="5" componentClass="textarea" bsClass="form-control" placeholder=""/>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button onClick={(dex) => this.calcInitiative(0)} bsStyle="info" pullRight={false} fill={true}>
                    Roll For initiative
                  </Button>

                  <Button onClick={() => this.updateCharacter()} bsStyle="info" pullRight={true} fill={true} type="submit">
                    Update Profile
                  </Button>

                  <div className="clearfix"></div>
                </form>}/>
              </Tab>

              <Tab eventKey={2} title="Stats">
                {<CharacterStats
                  raceBonus={this.raceInfo[this.state.race]}
                  savingThrows={this.state.savingThrows}
                  Proficencies={this.state.skills}/>}
              </Tab>

              <Tab eventKey={3} title="Abilities">
              </Tab>

              <Tab eventKey={4} title="Inventory">
              </Tab>
            </Tabs>
          </Col>

          <Col md={4}>
            <UserCard
              bgImage={bgImage}
              avatar={this.state.image}
              images={images}
              setImage={(index) => this.setImage(index)}
              name={this.state.name}
              charClass={this.state.charClass}
              aliment={this.state.aliment}
              armorClass={this.state.armorClass}
              initiative={this.state.initiative}
              speed={this.state.speed}
              hitPoints={this.state.hitPoints}
              description={<span> "I'm in that two seat Lambo" < /span>} socials={<div > <Button simple="simple">
                <i className="fa fa-facebook-square"></i>
              </Button>

              <Button simple="simple">
                <i className="fa fa-twitter"></i>
              </Button>

              <Button simple="simple">
                <i className="fa fa-google-plus-square"></i>
              </Button>
            </div>}/>
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}

export default CreateCharacter;
