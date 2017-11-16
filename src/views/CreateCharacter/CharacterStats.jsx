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
      skills: this.props.proficencies
    }
  }

  componentDidMount() {
    this.props.reRollSavingThrows();
    this.getProficencies();
  }

  handleBonusChange(evt) {
    this.setState({skillBonuses: {}});
  }

  getProficencies() {
    console.log('getProficencies', this.props.character.charClass);

    switch (this.props.character.charClass) {
      case 'Fighter':
        break;
      case 'Barbarian':
        break;
      case 'Bard':
        break;
      case 'Cleric':
        break;
      case 'Druid':
        break;
      case 'Fighter':
        break;
      case 'Monk':
        break;
      case 'Paladin':
        break;
      case 'Ranger':
        break;
      case 'Rogue':
        break;
      case 'Sorcerer':
        break;
      case 'Warlock':
        break;
      case 'Wizard':
        break;
      case 'Custom':
        break;
      default:
        console.log('getProficencies', this.props.character.charClass);
    }
  }

  render() {
    var raceBonuses = this.props.raceBonus.bonus;
    const skills = Object.keys(this.props.proficencies);

    let savingThrowsProps = Object.keys(this.props.savingThrows).map((item, i) => {
      return {
        label: item + " " + (
          raceBonuses[item]
          ? ' +' + raceBonuses[item]
          : ''),
        type: "number",
        bsClass: "form-control",
        placeholder: this.props.savingThrows[item],
        value: this.props.savingThrows[item],
        inputRef: (ref) => {
          this[item] = ref
        }
      }
    });

    let proficenciesList = Object.keys(this.props.proficencies).map((item, i) => {
      return {
        label: item,
        type: "number",
        bsClass: "form-control",
        placeholder: this.props.proficencies[item],
        inputRef: (ref) => {
          this[item] = ref
        }
      }
    });

    return (<div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <Card title="Edit Stats" content={<form > <ControlLabel>Saving Throws</ControlLabel>

              <FormInputs ncols={[
                  "col-md-2",
                  "col-md-2",
                  "col-md-2",
                  "col-md-2",
                  "col-md-2",
                  "col-md-2"
                ]} proprieties={savingThrowsProps}/>

              <Button onClick={() => this.props.reRollSavingThrows()} bsStyle="info" pullRight={false} fill={true}>
                <i className="fa fa-random"></i>
                Re-roll Saving Throws
              </Button>

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
                      proficenciesList[13], proficenciesList[14], proficenciesList[15]
                    ]}/>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInputs ncols={["col-md-4", "col-md-4"]} proprieties={[
                      proficenciesList[16], proficenciesList[17]
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
