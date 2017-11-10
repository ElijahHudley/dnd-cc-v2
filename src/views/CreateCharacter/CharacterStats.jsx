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

class CharacterStats extends Component {
  constructor(props) {
    console.log('CharacterStats props', props);
    super(props);

    this.state = {
      savingThrows: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    },
    skills:{
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

  }

  componentDidMount() {
    this.reRollSavingThrows();
  }

  reRollSavingThrows(){
    var bonuses = this.props.raceBonus.bonus;

    var savingThrows = {
      strength: Math.floor(Math.random() * (8 - 1) + 1) +
      (bonuses.strength ? bonuses.strength : 0),

      dexterity: Math.floor(Math.random() * (8 - 1) + 1) +
      (bonuses.dexterity ? bonuses.dexterity : 0),

      constitution: Math.floor(Math.random() * (8 - 1) + 1) +
      (bonuses.constitution ? bonuses.constitution : 0),

      intelligence: Math.floor(Math.random() * (8 - 1) + 1) +
      (bonuses.intelligence ? bonuses.intelligence : 0),

      wisdom: Math.floor(Math.random() * (8 - 1) + 1) +
      (bonuses.wisdom ? bonuses.wisdom : 0),

      charisma: Math.floor(Math.random() * (8 - 1) + 1) +
       (bonuses.charisma ? bonuses.charisma : 0)
    }

    this.setState({savingThrows: savingThrows});
  }

  render() {
    var bonuses = this.props.raceBonus.bonus;

    return (<div className="content">
      <Grid fluid="fluid">
        <Row>
          <Col md={12}>
            <Card title="Edit Profile" content={<form >
              <ControlLabel>Saving Throws</ControlLabel>

              <FormInputs ncols={["col-md-2", "col-md-2", "col-md-2", "col-md-2", "col-md-2", "col-md-2"]} proprieties={[
                  {
                    label: "Strength" + (bonuses.strength ? ' +' + bonuses.strength : ''),
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "Strength",
                    value: this.state.savingThrows.strength

                  }, {
                    label: "Dexterity" + (bonuses.dexterity ? ' +' + bonuses.dexterity : ''),
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "Dexterity",
                    value: this.state.savingThrows.dexterity
                  }, {
                    label: "Constitution" + (bonuses.constitution ? ' +' + bonuses.constitution : ''),
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "Constitution",
                    value: this.state.savingThrows.constitution
                  }, {
                    label: "Intelligence" + (bonuses.strength ? ' +' + bonuses.strength : ''),
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "Intelligence",
                    value: this.state.savingThrows.intelligence
                  }, {
                    label: "Wisdom" + (bonuses.wisdom ? ' +' + bonuses.wisdom : ''),
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "Wisdom",
                    value: this.state.savingThrows.wisdom
                  }, {
                    label: "Charisma" + (bonuses.charisma ? ' +' + bonuses.charisma : ''),
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "Charisma",
                    value: this.state.savingThrows.charisma
                  }
                ]}/>

                <Button onClick={() => this.reRollSavingThrows()} bsStyle="info" pullRight={false} fill={true}>
                  Re-roll Saving Throws
                </Button>

                <hr/>

                <Row>
                  <ControlLabel>Proficencies</ControlLabel>
                  <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                        {
                          label: "Acrobatics",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Acrobatics",
                        }, {
                          label: "Athletics",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Athletics",
                        }, {
                          label: "Sleightofhand",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Sleightofhand"
                        }
                      ]}/>

                      <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                            {
                              label: "Stealth",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Stealth"
                            }, {
                              label: "Arcana",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Arcana"
                            }, {
                              label: "History",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "History"
                            }
                          ]}/>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                        {
                          label: "Investigation",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Investigation",
                        }, {
                          label: "Nature",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Nature",
                        }, {
                          label: "Religion",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Religion"
                        }
                      ]}/>

                      <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                            {
                              label: "AnimalHandling",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "AnimalHandling"
                            }, {
                              label: "Insight",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Insight"
                            }, {
                              label: "Medicine",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Medicine"
                            }
                          ]}/>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                        {
                          label: "Perception",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Perception",
                        }, {
                          label: "Survival",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Survival",
                        }, {
                          label: "Deception",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Deception"
                        }
                      ]}/>

                      <FormInputs ncols={["col-md-4", "col-md-4", "col-md-4"]} proprieties={[
                            {
                              label: "Intimidation",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Intimidation"
                            }, {
                              label: "Performance",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Performance"
                            }, {
                              label: "Persuasion",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Persuasion"
                            }
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
