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
import CharacterAbilities from './CharacterAbilities.jsx';
import CharacterInventory from './CharacterInventory.jsx';
import CharacterProfile from './CharacterProfile.jsx';

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
      character : {
      name: "Hiro Yakamora",
      charClass: 'Barbarian',
      aliment: 'Lawful good',
      image: avatar,
      armorClass: 0,
      initiative: 0,
      speed: 0,
      hitPoints: 0,
      proficencyBonus: 2,
      level: 1,
      backgroundStory: 'Bad Guy',
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
      }
    };

    this.Name = this.state.character.name;

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
      'Dragonborn': {
        speed: 30,
        bonus: {strength: 2, charisma: 1},
        abilities: [{}]
      },
      'Dwarf': {
        speed: 25,
        bonus: {constitution: 2},
        abilities: [{'Darkvision':'60 Feet'}]
      },
      'Elf': {
        speed: 30,
        bonus: {dexterity: 2},
        abilities: ['']
      },
      'Half-Elf': {
        speed: 30,
        bonus: {charisma: 2},
        abilities: ['']
      },
      'Half-Orc': {
        speed: 30,
        bonus: {strength: 2, constitution: 1},
        abilities: [{'Darkvision':'60 Feet'}]
      },
      'Halfling': {
        speed: 25,
        bonus: {dexterity: 2},
        abilities: ['']
      },
      'Human': {
        speed: 30,
        bonus: {},
        abilities: ['']
      },
      'Tiefling': {
        speed: 30,
        bonus: {intelligence: 1, charisma: 2},
        abilities: [{'Darkvision':'60 Feet'}]
      },
      'Gnome': {
        speed: 25,
        bonus: {intelligence: 2},
        abilities: ['']
      },
      'Custom': {
        speed: 0,
        bonus: {hitPoints: 0}, bonus: {},
        abilities: ['']
      }
    }
  }

  setImage(index) {
    var character = this.state.character;
    character.image = images[index];

    this.updateCharacter(character);
  }

  handleNameChange(evt) {
    console.log('handleNameChange', evt.target.value);
    var character = this.state.character;
    character.name = evt.target.value;

    this.updateCharacter(character);
  }

  handleLevelChange(evt) {
    var self = this;
    var level = evt.target.value;
    var bonus = 2;

    if(level <= 0){bonus = 0;}
    if(level > 4){bonus = 3;}
    if(level > 8){bonus = 4;}
    if(level > 12){bonus = 5;}
    if(level > 16){bonus = 6;}

    console.log('handleLevelChange', level, 'bonus', bonus);
    var character = this.state.character;
    character.proficencyBonus = bonus;

    this.updateCharacter(character);
  }

  handleClassChange(evt) {
    var self = this;
    var selected = evt.target.value;
    var character = this.state.character;
    character.charClass = selected;
    character.armorClass = this.charClassesInfo[selected].armorClass;
    character.hitPoints = this.charClassesInfo[selected].hitPoints;
    console.log('handleClassChange', selected);

    this.updateCharacter(character);
  }

  handleRaceChange(evt) {
    var self = this;
    var selected = evt.target.value;
    var character = this.state.character;
    character.race = selected;
    character.speed = this.raceInfo[selected].speed;

    console.log('handleRaceChange', selected);

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
      character.savingThrows = savingThrows;
    }

    this.updateCharacter(character);
  }

  reRollSavingThrows(){
    var bonuses = this.raceInfo[this.state.character.race].bonus;

    function getCummTotal(){
      var die1 = Math.floor(Math.random() * (6 - 1) + 1);
      var die2 = Math.floor(Math.random() * (6 - 1) + 1);
      var die3 = Math.floor(Math.random() * (6 - 1) + 1);
      var die4 = Math.floor(Math.random() * (6 - 1) + 1);
      var cummTotal = [die1,die2,die3,die4];

      var low = Math.min.apply(null, cummTotal);

      function getSum(total, num) {
          return total + num;
      }

      for(var c in cummTotal){
        if(cummTotal[c] === low){
          cummTotal.slice(c, 1);
          break;
        }
      }

      cummTotal = cummTotal.reduce(getSum);
      return cummTotal;
    }

    var savingThrows = {
      strength: getCummTotal() + (bonuses.strength ? bonuses.strength : 0),
      dexterity: getCummTotal() + (bonuses.dexterity ? bonuses.dexterity : 0),
      constitution: getCummTotal() + (bonuses.constitution ? bonuses.constitution : 0),
      intelligence: getCummTotal() + (bonuses.intelligence ? bonuses.intelligence : 0),
      wisdom: getCummTotal() + (bonuses.wisdom ? bonuses.wisdom : 0),
      charisma: getCummTotal() + (bonuses.charisma ? bonuses.charisma : 0)
    }

    console.log('reRollSavingThrows', bonuses, savingThrows);
    var character = this.state.character;
    character.savingThrows = savingThrows;

    this.updateCharacter(character);
  }

  handleAlimentChange(evt) {
    console.log('handleAlimentChange', evt.target.value);
    var character = this.state.character;
    character.aliment = evt.target.value;

    this.updateCharacter(character);
  }

  updateCharacter(character) {
    console.log('updateCharacter', character);
    var character = this.state.character;

    this.setState({character: character});
  }

  saveCharacter(ev) {
    console.log('updateCharacter', ev, this.refs);
    var character = this.state.character;

    this.setState({character: character});
  }


  handleInitiative(val){
    var character = this.state.character;
    character.initiative = val;

    this.updateCharacter(character);
  }

  render() {

    return (<div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={8}>
            <Tabs activeKey={this.state.character.key} onSelect={this.handleSelect} id="controlled-tab-example">
              <Tab eventKey={1} title="Profile">

              <CharacterProfile
                character={this.state.character}
                updateCharacter={(character) => this.updateCharacter(character)}
                handleInitiative={(val) => this.handleInitiative(val)}
                initiative={this.state.character.initiative}
                handleAlimentChange={(evt) => this.handleAlimentChange(evt)}
                handleNameChange={(evt) => this.handleNameChange(evt)}
                handleLevelChange={(evt) => this.handleLevelChange(evt)}
                handleClassChange={(evt) => this.handleClassChange(evt)}
                handleRaceChange={(evt) => this.handleRaceChange(evt)}
                savingThrows={this.state.character.savingThrows}
                />
              </Tab>

              <Tab eventKey={2} title="Stats">
                {<CharacterStats
                  character={this.state.character}
                  updateCharacter={(character) => this.updateCharacter(character)}
                  reRollSavingThrows={() => this.reRollSavingThrows()}
                  raceBonus={this.raceInfo[this.state.character.race]}
                  savingThrows={this.state.character.savingThrows}
                  proficencies={this.state.character.skills}/>}
              </Tab>

              <Tab eventKey={3} title="Abilities">
                {<CharacterAbilities
                  character={this.state.character}
                  updateCharacter={(character) => this.updateCharacter(character)}/>}
              </Tab>

              <Tab eventKey={4} title="Inventory">
              {<CharacterInventory
                character={this.state.character}
                updateCharacter={(character) => this.updateCharacter(character)}/>}
              </Tab>
            </Tabs>
          </Col>


          <Col md={4}>
            <UserCard
              bgImage={bgImage}
              avatar={this.state.character.image}
              images={images}
              setImage={(index) => this.setImage(index)}
              name={this.state.character.name}
              charClass={this.state.character.charClass}
              aliment={this.state.character.aliment}
              armorClass={this.state.character.armorClass}
              initiative={this.state.character.initiative}
              speed={this.state.character.speed}
              hitPoints={this.state.character.hitPoints}
              proficencyBonus={this.state.character.proficencyBonus}
              description={<span> {this.state.character.backgroundStory} < /span>}
              socials={<div > <Button simple="simple">
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
