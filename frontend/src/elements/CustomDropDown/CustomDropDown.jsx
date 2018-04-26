import React, {Component} from 'react';
import {FormGroup, FormControl, DropdownButton, ControlLabel} from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';

class CustomDropDown extends Component {
  constructor(props) {
    super(props);

    var title = '';

    if(this.props.Items[0] === ''){
      if(this.props.Items[1] !== undefined){
        title = this.props.Items[1];
      }
    }else{
      title = this.props.Items[0];
    }

    this.state = {
      title: title
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.inputEl = 'select'
  }

  handleSelect(evt){
    console.log('handleSelect', evt.target.value);

    if(evt.target.value === ''){
      return;
    }

    this.setState({title:evt.target.value});
    this.props.handleChange();
  }

  render() {
    var listItems = this.props.Items;
    listItems.unshift('');

    let itemOptions = listItems.map((item,i) => {
      return <option key={i} id={i} value={item}>{item}</option>
    });

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
                id={this.props.id}
                onChange={this.props.handleChange()}>
              {itemOptions}
              </FormControl>
            </FormGroup>
          );
  }
}

// CustomDropDown.propTypes = {
//   Items: PropTypes.array,
//   Title: PropTypes.string,
// }

export default CustomDropDown;
