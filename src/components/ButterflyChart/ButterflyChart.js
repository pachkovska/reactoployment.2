import React, { Component } from 'react';
import Barchart from '../Barchart/Barchart.js';

import './ButterflyChart.css';

class ButterflyChart extends Component {

    render() {

    const years = []

    return (
        <div className="ChartAreaContainer Card--style">
                <div className="ChartAreaContainer-dimention">Number of employed</div>
                <div className="ChartAreaContainer-leftLabel">{this.props.occupation_select_1}</div>
                <div className="ChartAreaContainer-rightLabel">{this.props.occupation_select_2}</div>
                <Barchart
                  data={this.props.data}
                  occupation={this.props.occupation_select_1}
                  graph="Graph1"
                  graphBar="Graph1-bar"
                  highest_employed={this.props.highest_employed} 
                />
                <div className="Years">
                  { 
                    this.props.data && (this.props.occupation_select_1 || this.props.occupation_select_2) &&
                    this.props.data.filter(el => el.year > 2010).forEach(element => {
                        (!years.includes(element.year) && years.push(element.year))
                    })
                  }
                  {
                      years.map(year => <div>{year}</div>)
                  }
                </div>
                <Barchart
                  data={this.props.data}
                  occupation={this.props.occupation_select_2}
                  graph="Graph2"
                  graphBar="Graph2-bar"
                  highest_employed={this.props.highest_employed} 
                />
            </div>
    )}
}

export default ButterflyChart;