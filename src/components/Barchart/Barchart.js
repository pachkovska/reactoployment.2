import React, { Component } from 'react';

class Barchart extends Component {

    render() {
        return(
            
            <div className={this.props.graph}>
            {
              this.props.data && this.props.data.map(el => (el.occupational_title === this.props.occupation && el.year > 2010 ? 
              <div className={this.props.graphBar} style={{ width: Number(el.number_of_employed)/this.props.highest_employed * 100 + '%' }}>
                  {el.number_of_employed > 0 ? el.number_of_employed : 'Data not available'}</ div>  : null
              ))
            }
            </div>
        )

    }

}

export default Barchart;