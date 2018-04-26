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
import uuid from 'uuid/v4';

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
    super(props);

    var self = this;
    console.log('CreateCharacter ', this);
    console.log('CreateCharacter props', this.props);
    console.log('FROM LOCATION', this.props.location.state);

    this.charClassesInfo = {
      'Barbarian':  {name:'Barbarian', armorClass: 13, hitPoints: 13, savingThrows: {'strength': 3, 'constitution': 1}},
      'Bard':       {name:'Bard', armorClass: 13, hitPoints: 9, savingThrows: {'charisma': 3, 'dexterity': 1}},
      'Cleric':     {name:'Cleric', armorClass: 14, hitPoints: 9, savingThrows: {'wisdom': 3, 'charisma': 1}},
      'Druid':      {name:'Druid', armorClass: 13, hitPoints: 9, savingThrows: {'wisdom':3, 'intelligence': 1}},
      'Fighter':    {name:'Fighter', armorClass: 12, hitPoints: 11, savingThrows: {'strength': 3, 'dexterity': 2, 'constitution': 1}},
      'Monk':       {name:'Monk', armorClass: 12, hitPoints: 9, savingThrows: {'dexterity': 3, 'wisdom': 2, 'strength': 1}},
      'Paladin':    {name:'Paladin', armorClass: 16, hitPoints: 11, savingThrows: {'wisdom': 1, 'strength': 2, 'charisma': 3}},
      'Ranger':     {name:'Ranger', armorClass: 12, hitPoints: 11, savingThrows: {'dexterity': 2, 'strength': 1, 'wisdom': 2}},
      'Rogue':      {name:'Rogue', armorClass: 13, hitPoints: 9, savingThrows: {'dexterity': 3, 'intelligence': 1}},
      'Sorcerer':   {name:'Sorcerer', armorClass: 12, hitPoints: 7, savingThrows: {'charisma': 2, 'constitution': 1}},
      'Warlock':    {name:'Warlock', armorClass: 13, hitPoints: 9, savingThrows: {'charisma': 3, 'wisdom': 1}},
      'Wizard':     {name:'Wizard', armorClass: 12, hitPoints: 7, savingThrows: {'intelligence': 3, 'wisdom': 1}},
      'Custom':     {name:'Custom', armorClass: '', hitPoints: '', savingThrows: {}}
    }

    this.state = {
      character : {
      id: uuid(),
      name: "placeholder",
      charClass: this.charClassesInfo['Barbarian'],
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
      abilityScores: {
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
      },
      inventory: [],
      abilities: []
      }
    };

    this.Name = this.state.character.name;

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

  componentDidMount(){
    //console.log('CreateCharacter componentDidMounthis', this);
    //console.log('CreateCharacter componentDidMount props', this.props);
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

  reduceBeforeChangeSelect(type, selected){
    //first see if you can subtract value so it doesnt get doubled
    var savingThrows = this.state.character.savingThrows;
    var item;

    if(type === 'class'){
      item = this.charClassesInfo;
    } else {
      item = this.raceInfo;
    }

    for(var c in Object.keys(savingThrows)){
      var itemName = Object.keys(savingThrows)[c];
      if(savingThrows[itemName] > 0 && selected !== undefined){

        var stat = 0;
        if(type === 'class'){
          stat = item[selected].savingThrows[itemName];
        } else {
          stat = item[selected].bonus[itemName];
        }

        if(stat !== undefined){
          savingThrows[itemName] -= stat;
        }
      }
    }

    return savingThrows;
  }

  handleClassChange(evt) {
    if(evt.target.value === ''){
      return;
    }

    var self = this;
    var character = this.state.character;
    var savingThrows = this.reduceBeforeChangeSelect('class', this.previouslySelectedClass);

    var selected = evt.target.value;
    character.charClass = this.charClassesInfo[selected];
    character.armorClass = this.charClassesInfo[selected].armorClass;
    character.hitPoints = this.charClassesInfo[selected].hitPoints;

    for(var c in Object.keys(this.charClassesInfo[selected].savingThrows)){
      var itemName = Object.keys(this.charClassesInfo[selected].savingThrows)[c];
      var stat = this.charClassesInfo[selected].savingThrows[itemName] || 0;
      savingThrows[itemName] += stat;
      character.savingThrows = savingThrows;
    }

    this.previouslySelectedClass = selected;
    this.updateCharacter(character);
  }

  handleRaceChange(evt) {
    if(evt.target.value === ''){
      return;
    }

    var self = this;
    var character = this.state.character;
    var savingThrows = this.reduceBeforeChangeSelect('race', this.previouslySelectedRace);

    var selected = evt.target.value;
    character.race = selected;
    character.speed = this.raceInfo[selected].speed;

    console.log('handleRaceChange', selected);

    for(var c in Object.keys(this.raceInfo[selected].bonus)){
      var itemName = Object.keys(this.raceInfo[selected].bonus)[c];
      var stat = this.raceInfo[selected].bonus[itemName] || 0;
      savingThrows[itemName] += stat;
      character.savingThrows = savingThrows;
    }

    var abilityName = Object.keys(this.raceInfo[selected].abilities[0])[0];

    character.abilities.push({
      name: abilityName,
      details: this.raceInfo[selected].abilities[0][abilityName],
      index: character.abilities.length-1
    });

    this.previouslySelectedRace = selected;
    this.updateCharacter(character.savingThrows);
  }


  reRollAbilityScores(){
    var bonuses = this.state.character.savingThrows;

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

    var abilityScores = {
      strength: getCummTotal() + Number(bonuses.strength),
      dexterity: getCummTotal() + Number(bonuses.dexterity),
      constitution: getCummTotal() + Number(bonuses.constitution),
      intelligence: getCummTotal() + Number(bonuses.intelligence),
      wisdom: getCummTotal() + Number(bonuses.wisdom),
      charisma: getCummTotal() + Number(bonuses.charisma)
    }

    console.log('reRollAbilityScores', bonuses, abilityScores);
    var character = this.state.character;
    character.abilityScores = abilityScores;
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

  saveAndExit(character){
    this.updateCharacter(character);

    this.props.history.push({
      pathname: '/Dashboard',
      search: '', //?query=abc
      state: { character: character}
    });
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
                  reRollAbilityScores={() => this.reRollAbilityScores()}
                  raceBonus={this.raceInfo[this.state.character.race]}
                  savingThrows={this.state.character.savingThrows}
                  abilityScores={this.state.character.abilityScores}
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

            <Button onClick={(character) => this.saveAndExit(this.state.character)} bsStyle="info" pullRight={true} fill={true} type="submit">
            <i className="fa fa-save"></i> Save Character
            </Button>
          </Col>


          <Col md={4}>
            <UserCard
              bgImage={bgImage}
              avatar={this.state.character.image}
              images={images}
              setImage={(index) => this.setImage(index)}
              name={this.state.character.name}
              charClass={this.state.character.charClass}
              race={this.state.character.race}
              aliment={this.state.character.aliment}
              armorClass={this.state.character.armorClass}
              initiative={this.state.character.initiative}
              speed={this.state.character.speed}
              hitPoints={this.state.character.hitPoints}
              proficencyBonus={this.state.character.proficencyBonus}

              description={<span> {this.state.character.backgroundStory} < /span>}
              socials={
                <div>
                <Button simple="simple">
                  <i className="fa fa-facebook-square"></i>
                </Button>

                <Button simple="simple">
                  <i className="fa fa-twitter"></i>
                </Button>

                <Button simple="simple">
                  <i className="fa fa-google-plus-square"></i>
                </Button>
                </div>}
              />
          </Col>
        </Row>
      </Grid>

    </div>);
  }
}

export default CreateCharacter;
