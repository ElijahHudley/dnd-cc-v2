import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';

class CustomDropDown extends Component {
    render() {

      let itemOptions = this.props.Items.map(item =>
    {return <MenuItem className="form-control" key={item} value={item}>{item}</MenuItem> })

        const { Title, Items } = this.props;

        // const btnClasses = cx({
        //     'btn-fill': fill,
        //     'btn-simple': simple,
        //     'pull-right': pullRight,
        //     'btn-block': block,
        //     'btn-round': round
        // });

        return (
          <DropdownButton className="form-control" bsSize="lg" title={this.props.Title} id="bg-vertical-dropdown-1">
            {itemOptions}
          </DropdownButton>
          );
  }
}

CustomDropDown.propTypes = {
    Items: PropTypes.array,
    Title: PropTypes.string
}

export default CustomDropDown;
