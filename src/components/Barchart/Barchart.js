import React, { Component } from 'react';

import './Barchart.css';

class Barchart extends Component {

    render() {

        return(
            
            <div className={this.props.graph}>
            {   
              this.props.data && this.props.data.map((el) => (el.occupational_title === this.props.occupation  ? 
              <div className={this.props.graphBar} style={{ width: Number(el.number_of_employed)/this.props.highest_employed * 100 + '%' }}>
                  {el.number_of_employed}</ div> : null
              ))
            }
            </div>
        )

    }

}

export default Barchart;