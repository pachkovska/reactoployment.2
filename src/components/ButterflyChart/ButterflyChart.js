import React, { Component } from 'react';
import Barchart from './Barchart/Barchart.js';

class ButterflyChart extends Component {

    render() {

    return (
        <div className="ChartAreaContainer Card--style">
                <div className="ChartAreaContainer-dimention">Number of employed</div>
                <div className="ChartAreaContainer-leftLabel">{this.props.occupation_select_1}
                </div>
                <div className="ChartAreaContainer-rightLabel">{this.props.occupation_select_2}
                </div>
                <Barchart
                  data={this.props.data}
                  occupation={this.props.occupation_select_1}
                  graph="Graph1"
                  graphBar="Graph1-bar"
                  highest_employed={this.props.highest_employed} 
                />
                <div className="Years">
                  { 
                    [new Set(this.props.data.filter(el => el.year > 2010))].map(<div>{el.year}</div>)
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