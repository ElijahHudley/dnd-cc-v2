import React, {Component} from 'react';
import {FormGroup, FormControl, DropdownButton, ControlLabel} from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';

class CustomDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.Items[0].name
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.inputEl = 'select'
  }

  handleSelect(evt){
    console.log('handleSelect', evt.target.value);
    this.setState({title:evt.target.value});
    this.props.handleChange();
  }

  render() {
    let itemOptions = this.props.Items.map((item,i) => {
      return<option key={i} value={item}>{item}</option>
    })

    const {Title, Items} = this.props;

    // const btnClasses = cx({
    //     'btn-fill': fill,
    //     'btn-simple': simple,
    //     'pull-right': pullRight,
    //     'btn-block': block,
    //     'btn-round': round
    // });

    return (<FormGroup>
        <ControlLabel>{this.props.Title}</ControlLabel>
              <FormControl
                ref={select => { this.select = select }}
                componentClass="select"
                className="form-control"
                bsSize="lg"
                title={this.state.title}
                id="bg-vertical-dropdown-1"
                onChange={this.props.handleChange()}>
              {itemOptions}
              </FormControl>
            </FormGroup>
          );
  }
}

CustomDropDown.propTypes = {
  Items: PropTypes.array,
  Title: PropTypes.string
}

export default CustomDropDown;
