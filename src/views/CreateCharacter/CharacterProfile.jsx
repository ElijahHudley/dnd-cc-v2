import React, {Component} from 'react';

import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import DropDown from 'elements/CustomDropDown/CustomDropDown.jsx';

class CharacterProfile extends Component {
  constructor(props) {
    console.log('CharacterStats props', props);
    super(props);

    this.state = {}
  }

  componentDidMount() {
  }

  calcInitiative(){
    var roll = Math.floor(Math.random() * (20 - 1) + 1 + this.props.savingThrows.dexterity);
    this.props.handleInitiative(roll);
  }


  updateValues(){
    var character = this.props.character;
    character.backgroundStory = this.Background.value;
    character.faction = this.Faction.value;
    character.exp = this.EXP.value;
    character.dci = this.DCI.value;
    character.story.bonds = this.Bonds.value;
    character.story.flaws = this.Flaws.value;
    character.story.personality = this.Personality.value;
 
    console.log('updateValues', this.Personality.value)
    console.log('updateValues',this.Bonds.value)
    console.log('updateValues',this.Flaws.value)

  // var news = {
  //     name: this.Name,
  //     background: this.Background,
  //     faction: this.Faction,
  //     level:this.Level,
  //     exp: this.EXP,
  //     dci: this.DCI ,Bonds Flaws Personality
  //   }

    this.props.updateCharacter(character);
  }

  render() {
    console.log('render CharacterProfile', this);

    const aliments = [
      "Lawful good","Neutral good","Chaotic good","Lawful neutral","(True) neutral","Chaotic neutral","Lawful evil","Neutral evil","Chaotic evil"
    ];

    const classes = [
      'Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard','Custom'
    ];

    const races = ['Dragonborn','Dwarf','Elf','Gnome','Half-Elf','Half-Orc','Halfling','Human','Tiefling', 'Custom'
  ];

    return (<div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
          <Card title="Character Profile" content={<form > <FormInputs ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-2"]} proprieties={[
                {
                  label: "Name",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Name",
                  disabled: false,
                  inputRef: (ref) => {this.Name = ref},
                  onChange: this.props.handleNameChange.bind(this)
                }, {
                  label: "Background",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Background",
                  inputRef: (ref) => {this.Background = ref},
                  onChange: this.updateValues.bind(this)
                }, {
                  label: "Faction",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Faction",
                  inputRef: (ref) => {this.Faction = ref},
                  onChange: this.updateValues.bind(this)
                }, {
                  label: "Level",
                  type: "number",
                  bsClass: "form-control",
                  placeholder: "1",
                  onChange: this.props.handleLevelChange.bind(this),
                  inputRef: (ref) => {this.Level = ref}
                }
              ]}/>

            <FormInputs ncols={["col-md-3", "col-md-3"]} proprieties={[
                {
                  label: "EXP Points",
                  type: "Number",
                  bsClass: "form-control",
                  placeholder: "EXP Points",
                  inputRef: (ref) => {this.EXP = ref},
                  onChange: this.updateValues.bind(this)

                }, {
                  label: "DCI Number",
                  type: "Number",
                  bsClass: "form-control",
                  placeholder: "DCI Number",
                  inputRef: (ref) => {this.DCI = ref},
                  onChange: this.updateValues.bind(this)
                }
              ]}/>

            <Row>
              <Col md={4}>
                <DropDown
                onChange={() => this.updateValues.bind(this)}
                inputRef={ref => { this.Aliment = ref; }}
                handleChange={() => this.props.handleAlimentChange.bind(this)}
                Items={aliments} Title="Aliment"/>
              </Col>

              <Col md={4}>
                <DropDown
                onChange={() => this.updateValues.bind(this)}
                inputRef={ref => { this.Class = ref; }}
                handleChange={() => this.props.handleClassChange.bind(this)} Items={classes} Title="Class"/>
              </Col>

              <Col md={4}>
                <DropDown
                onChange={() => this.updateValues.bind(this)}
                inputRef={ref => { this.Race = ref; }}
                handleChange={() => this.props.handleRaceChange.bind(this)} Items={races} Title="Race"/>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Personality</ControlLabel>
                  <FormControl
                  onChange={() => this.updateValues.bind(this)}
                  inputRef={ref => { this.Personality = ref; }}
                  rows="5" componentClass="textarea" bsClass="form-control" placeholder=""/>
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Bonds</ControlLabel>
                  <FormControl
                  onChange={() => this.updateValues.bind(this)}
                  inputRef={ref => { this.Bonds = ref; }}
                  rows="5" componentClass="textarea" bsClass="form-control" placeholder=""/>
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Flaws</ControlLabel>
                  <FormControl
                  onChange={() => this.updateValues.bind(this)}
                  inputRef={ref => { this.Flaws = ref; }}
                  rows="5" componentClass="textarea" bsClass="form-control" placeholder=""/>
                </FormGroup>
              </Col>
            </Row>

            <Button onClick={() => this.calcInitiative()} bsStyle="info" pullRight={false} fill={true}>
              <i className="fa fa-random"></i> Roll For initiative: {" " + this.props.initiative}
            </Button>

            <Button onClick={() => this.props.updateCharacter()} bsStyle="info" pullRight={true} fill={true} type="submit">
            <i className="fa fa-save"></i> Update Profile
            </Button>

            <div className="clearfix"></div>
          </form>}/>
          </Col>
        </Row>

      </Grid>
    </div>);
  }
}

export default CharacterProfile;
