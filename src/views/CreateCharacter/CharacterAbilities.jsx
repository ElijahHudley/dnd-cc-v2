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

class CharacterAbilities extends Component {
  constructor(props) {
    console.log('CharacterAbilities props', props);
    super(props);

    this.state = {}
  }

  componentDidMount() {
  }

  render() {

    return (<div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <Card title="Edit Abilities" content={<form >
              <ControlLabel>Character Abilities</ControlLabel>

                <Button onClick={null} bsStyle="info" pullRight={false} fill={true}>
                <i className="fa fa-random"></i> Abilities
                </Button>

                <hr/>

              <div className="clearfix"></div>
            </form>}/>
          </Col>
        </Row>

      </Grid>
    </div>);
  }
}

export default CharacterAbilities;
