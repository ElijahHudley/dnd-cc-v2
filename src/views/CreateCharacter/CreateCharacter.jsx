import React, {Component} from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import DropDown from 'elements/CustomDropDown/CustomDropDown.jsx';

import bgImage from "assets/img/bg04.jpg";
import avatar from "assets/img/color/Aarin.bmp";

function importAll(r) {return r.keys().map(r);}

//nice way to get all images from folder
const images = importAll(require.context('assets/img/color', false, /\.(bmp|png|jpe?g|svg)$/));

class CreateCharacter extends Component {
  constructor(props) {
    console.log('props', props);
    super(props);

    this.state = {
      name: "Mike Andrew",
      charClass: '',
      aliment: '',
      image: avatar,
      armorClass: 0,
      initiative: 0,
      speed: 0 ,
      hitPoints: 0
    };

    this.Name = this.state.name;
  }

  setImage(index) {
    this.setState({image: images[index]});
  }

  handleNameChange(evt){
    console.log('handleChange', evt);
    console.log('handleChange', evt.target.value);
    this.setState({name: evt.target.value});
  }

  handleClassChange(evt){
    console.log('handleChange', evt.target.value);
    this.setState({name: evt.target.value});
  }


  handleAlimentChange(evt){
    console.log('handleChange', evt.target.value);
    this.setState({name: evt.target.value});
  }


  updateCharacter(ev){
    console.log('updateCharacter', ev, this.refs);
  }

  render() {
    return (<div className="content">
      <Grid fluid="fluid">
        <Row>
          <Col md={8}>
            <Card title="Character Profile" content={<form>
              <FormInputs ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-2"]} proprieties={[
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
                    placeholder: "Background",
                  }, {
                    label: "Faction",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Merc"
                  }, {
                    label: "Level",
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "1"
                  }
                ]}/>

              <FormInputs ncols={["col-md-3", "col-md-3", "col-md-3"]} proprieties={[
                  {
                    label: "Race",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Race",
                  }, {
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
                    <DropDown onSelect={() => this.handleAlimentChange.bind(this)} Items={["Lawful good", "Neutral good", "Chaotic good", "Lawful neutral", "(True) neutral", "Chaotic neutral", "Lawful evil", "Neutral evil", "Chaotic evil"]} Title="Aliment"/>
                  </Col>

                  <Col md={4}>
                    <DropDown onSelect={() => this.handleClassChange.bind(this)} Items={['Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard','Custom']} Title="Class"/>
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

              <Button onClick={() => this.updateCharacter()} bsStyle="info" pullRight={true} fill={true} type="submit">
                Update Profile
              </Button>

              <div className="clearfix"></div>
            </form>}/>

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
              name={this.state.name}
              armorClass={this.state.armorClass}
              initiative={this.state.initiative}
              speed={this.state.speed}
              hitPoints={this.state.hitPoints}
              description={<span> "I'm in that two seat Lambo" </span>}
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
            </div>}/>
          </Col>

        </Row>
      </Grid>
    </div>);
  }
}

export default CreateCharacter;
