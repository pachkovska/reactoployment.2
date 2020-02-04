import React, { Component } from 'react';

class Dropdown extends Component {

    render() {
        return(
            
            <select onChange={this.props.onDropDownOptions} name={this.props.name} id={this.props.id}>
            {   
                this.props.options && this.props.options.map(option => (
                <option value={option}>{option}</ option>
              ))
            }
            </select>
        )

    }

}

export default Dropdown;