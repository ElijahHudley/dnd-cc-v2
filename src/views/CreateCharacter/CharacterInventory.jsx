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

class CharacterInventory extends Component {
  constructor(props) {
    console.log('CharacterInventory props', props);
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
            <Card title="Edit Inventory" content={<form >
              <ControlLabel>Character Inventory</ControlLabel>

                <Button onClick={null} bsStyle="info" pullRight={false} fill={true}>
                <i className="fa fa-random"></i> Inventory
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

export default CharacterInventory;
