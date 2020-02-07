import React, { Component } from 'react';

import './Dropdown.css';

class Dropdown extends Component {

    render() {
        return(
            
            <select onChange={this.props.onDropDownOptions} name={this.props.name} id={this.props.id}>
            {   
                this.props.options && this.props.options.map(option => (
                <option value={ option.occupational_title ? option.occupational_title : option }>
                    {option.occupational_title ? option.occupational_title : option}</ option>
              ))
            }
            </select>
        )

    }

}

export default Dropdown;