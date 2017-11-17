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


  onClickAddItem(evt){
    console.log('onClickAddItem', this.invName);
    console.log('onClickAddItem', this.invDetails);

    if(this.invName.value === '' || this.invDetails.value === ''){
      return;
    }

    var character = this.props.character;

    var item = {
      name: this.invName.value,
      details: this.invDetails.value,
      index: character.inventory.length-1
    }

    character.inventory.push(item);
    this.props.updateCharacter(character);
  }

  onClickRemoveItem(evt){
    console.log('onClickRemoveItem', evt, evt.target.dataset['index']);

    var index = evt.target.dataset['index'];
    var character = this.props.character;

    character.inventory.splice(index, 1);
    this.props.updateCharacter(character);
  }

  render() {
    let inventory = [];
    if(this.props.character.inventory){
      inventory = this.props.character.inventory.map((item, i) => {
        return (<option data-index={i} key={i} title={"Details: " + item.details} onClick={this.onClickRemoveItem.bind(this)} value="select">{"Name: " + item.name}</option>)
      });
    }

    return (<div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <Card title="Edit Inventory" content={<form >
              <ControlLabel>Character Inventory</ControlLabel>
              <br/>

              <Col md={3}>
                <ControlLabel>Name</ControlLabel>
                <FormControl inputRef={(ref) => {console.log('ref', ref, this); this['invName'] = ref}} placeholder={'item'} bsClass={"form-control"} type={'text'} />
                <br/>

                <Button onClick={() => this.onClickAddItem()} bsStyle="info" pullRight={false} pullLeft={true}  fill={true}>
                  <i className="fa fa-arrow-right"></i>&nbsp; Add Item</Button>
              </Col>

              <Col md={3}>
                <ControlLabel>Detail</ControlLabel>
                <FormControl inputRef={(ref) => {this['invDetails'] = ref}} placeholder={'item'} bsClass={"form-control"} type={'text'} />
              </Col>


              <Col md={6}>
              <ControlLabel>Edit Inventory </ControlLabel>

              <FormGroup controlId="formControlsSelectMultiple">
                    <FormControl componentClass="select" multiple>
                      {inventory}
                    </FormControl>
                  </FormGroup>

                  <ControlLabel>(hover for info)</ControlLabel><br/>
                  <ControlLabel>(click to remove)</ControlLabel>
              </Col>


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
