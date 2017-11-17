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

class CharacterStats extends Component {
  constructor(props) {
    console.log('CharacterStats props', props);
    super(props);

    this.state = {
      savingThrows: this.props.savingThrows,
      skills: this.props.proficencies,
      skillBonuses: {
        type: [],
        limit: [1,2]
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentWillReceiveProps(){
    var item = this.getProficencies();
    console.log('CharacterStats componentWillReceiveProps', item);
    this.setState({skillBonuses: item});
  }

  componentDidMount() {
    console.log('CharacterStats componentDidMount');
    this.props.reRollAbilityScores();

    for(var c in Object.keys(this.props.proficencies)){
      var listItem = Object.keys(this.props.proficencies)[c];
      this[listItem].value = 0;
    }
  }

  componentWillMount() {
    console.log('CharacterStats componentWillMount');
    var item = this.getProficencies();

    console.log('CharacterStats componentWillReceiveProps', item);
    this.setState({skillBonuses: item});
  }

  handleBonusChange(evt) {
    var character = this.props.character;

  }

  getProficencies() {
    console.log('getProficencies', this.props.character.charClass.name);
    var skillBonuses = {};

    switch (this.props.character.charClass.name) {
      case 'Fighter':
        skillBonuses = {
          skillBonuses: {
            type: ['acrobatics','animalhandling','athletics','history','insight','intimidation','perception','survival'],
            limit:[1,2]
          }
        };
        break;
      case 'Barbarian':
      skillBonuses = {
          skillBonuses: {
            type: ['animalhandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
            limit: [1,2]
          }
        };
        break;
      case 'Bard':
      skillBonuses = {
          skillBonuses: {
            type: Object.keys(this.state.skills),
            limit: [1,2,3]
          }
        };
        break;
      case 'Cleric':
      skillBonuses = {
          skillBonuses: {
            type: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
            limit: [1,2]
          }
        };
        break;
      case 'Druid':
      skillBonuses = {
          skillBonuses: {
            type: ['arcana', 'animalhandling', 'insight', 'medicine', 'nature', 'preception', 'religion', 'survival'],
            limit: [1,2]
          }
        };
        break;
      case 'Monk':
      skillBonuses = {
          skillBonuses: {
            type: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
            limit: [1,2]
          }
        };
        break;
      case 'Paladin':
      skillBonuses = {
          skillBonuses: {
            type: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
            limit: [1,2]
          }
        };
        break;
      case 'Ranger':
      skillBonuses = {
          skillBonuses: {
            type: ['animalhandling', 'athletics', 'insight', 'investigation', 'nature', 'perception','stealth', 'survival'],
            limit: [1,2,3]
          }
        };
        break;
      case 'Rogue':
      skillBonuses = {
          skillBonuses: {
            type: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleightofhand', 'stealth'],
            limit: [1,2,3,4]
          }
        };
        break;
      case 'Sorcerer':
      skillBonuses = {
          skillBonuses: {
            type: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
            limit: [1,2]
          }
        };
        break;
      case 'Warlock':
      skillBonuses = {
          skillBonuses: {
            type: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
            limit: [1,2]
          }
        };
        break;
      case 'Wizard':
      skillBonuses = {
          skillBonuses: {
            type: ['arcana', 'insight', 'history', 'medicine', 'investigation', 'religion'],
            limit: [1,2]
          }
        };
        break;
      case 'Custom':
      skillBonuses = {
          skillBonuses: {
            type: [],
            limit: []
          }
        };
        break;
      default:
        console.log('getProficencies', this.props.character.charClass.name, this.state.skillBonuses);
    }

    return skillBonuses.skillBonuses;
    // this.setState({skillBonuses: skillBonuses.skillBonuses});
  }

  updateSkillBonuses(evt) {
    console.log('updateSkillBonuses', evt.target.value);

    for(var c in Object.keys(this.props.proficencies)){
      var listItem = Object.keys(this.props.proficencies)[c];
      //this[listItem].value = 0;
    }

    this[evt.target.value].value = (Number(this[evt.target.value].value) + Number(this.props.character.proficencyBonus));
    this.updateValues.bind(this);
  }

  updateValues(){
    console.log('updateValues',this);
    var character = this.props.character;

    for(var c in Object.keys(this.props.proficencies)){
      var listItem = Object.keys(this.props.proficencies)[c];
      character.skills[listItem] = this[listItem].value;
    }

    console.log('updateValues',character.skills);
    this.props.updateCharacter(character);
  }

  render() {
    console.log('render CharacterStats', this.props.character.charClass.name, this.state.skillBonuses);

    var raceBonuses = this.props.character.savingThrows;
    const skills = Object.keys(this.props.proficencies);

    let abilityScoresProps = Object.keys(this.props.abilityScores).map((item, i) => {
      return {
        label: item + " " + (
          raceBonuses[item]
          ? ' +' + raceBonuses[item]
          : ''),
        type: "number",
        bsClass: "form-control",
        placeholder: this.props.abilityScores[item],
        value: this.props.abilityScores[item],
        inputRef: (ref) => {
          this[item] = ref
        }
      }
    });

    let savingThrowsProps = Object.keys(this.props.character.savingThrows).map((item, i) => {
      return <Col key={i} md={2}>
        <label className='control-label'> {item} </label><br/>
        <label className='value'> {this.props.character.savingThrows[item]} </label></Col>
    });

    let bonusList = this.state.skillBonuses.limit.map((item, i) => {
      return <Col key={i} md={4}>
    <DropDown
    onChange={() => this.updateValues.bind(this)}
    inputRef={ref => { this['Bonus'+Number(i+1)] = ref; }}
    handleChange={() => this.updateSkillBonuses.bind(this)}
    Items={this.state.skillBonuses.type} Title={'Bonus '+Number(i+1)}/></Col>
  });


    let proficenciesList = Object.keys(this.props.proficencies).map((item, i) => {
      return {
        label: item,
        type: "number",
        bsClass: "form-control",
        placeholder: this.props.proficencies[item],
        onChange: this.updateValues.bind(this),
        inputRef: (ref) => {
          this[item] = ref;
        }
      }
    });

    return (<div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <Card title="Edit Stats" content={<form>

              <Row>
                <ControlLabel>Saving Throws</ControlLabel>
                <br/>
                {savingThrowsProps}
              </Row>

              <hr/>

              <ControlLabel>Ability Scores</ControlLabel>
              <FormInputs ncols={[
                  "col-md-2",
                  "col-md-2",
                  "col-md-2",
                  "col-md-2",
                  "col-md-2",
                  "col-md-2"
                ]} proprieties={abilityScoresProps}/>

              <Button onClick={() => this.props.reRollAbilityScores()} bsStyle="info" pullRight={false} fill={true}>
                <i className="fa fa-random"></i>
                Re-roll Ability Scores
              </Button>
              <hr/>

              <Row>
                <ControlLabel>Proficency Bonus - {this.props.character.race + ' / ' + this.props.character.charClass.name} </ControlLabel>
                <br/>
                {bonusList}
              </Row>

              <hr/>
              <Row>
                <ControlLabel>Proficencies</ControlLabel>

                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[0], proficenciesList[1], proficenciesList[2]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[3], proficenciesList[4], proficenciesList[5]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[6], proficenciesList[7], proficenciesList[8]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[9], proficenciesList[10], proficenciesList[11]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[12], proficenciesList[13], proficenciesList[14]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[15], proficenciesList[16], proficenciesList[17]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4"]} proprieties={[
                      proficenciesList[18]
                    ]}/>
                </Col>
              </Row>
              <div className="clearfix"></div>
            </form>}/>
          </Col>
        </Row>

      </Grid>
    </div>);
  }
}

export default CharacterStats;
