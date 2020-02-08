import React, { Component } from 'react';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown.js';
import ButterflyChart from './components/ButterflyChart/ButterflyChart.js';

class App extends Component {

state = {
      data: [],
      areas: ["California", "Chico MSA", "Sacramento--Roseville--Arden-Arcade MSA", "Oakland-Hayward-Berkeley Metro Div", "Napa MSA", "Modesto MSA", "Los Angeles-Long Beach-Glendale Metro Div", "San Jose-Sunnyvale-Santa Clara MSA", "San Francisco-Redwood City-South San Francisco Metro Div"],
      area_selection: "California",
      occupation_select_1 : "",
      occupation_select_2 : "",
      highest_salary: 150000,
      highest_employed : 1000,
    }


  componentDidMount () {
    fetch(`https://data.edd.ca.gov/resource/pwxn-y2g5.json?wage_type=Annual wage or salary&area_name=${this.state.area_selection}&$limit=10000`)
    .then(response => response.json())
    .then(data => {
        this.setState({
          data : data.filter(el => el.year > 2010).filter(el => el.occupational_title.length < 20), //filter out noisy results 
        });
        console.log(data)
    });
  }

  onOptionChange = (ev) => {
    let {name, value} = ev.target;
    this.setState({
      [name]: value,
    }, this.updateHighest);
  }

  updateHighest = () => {
    let getHighest_1 = Math.max(...this.state.data.filter(el => el.occupational_title === this.state.occupation_select_1).map(el => Number(el.number_of_employed)).filter(el => !Number.isNaN(el)));
    let getHighest_2 = Math.max(...this.state.data.filter(el => el.occupational_title === this.state.occupation_select_2).map(el => Number(el.number_of_employed)).filter(el => !Number.isNaN(el)));
    this.setState({
      highest_employed: Math.max(getHighest_1, getHighest_2),
    });
  }

  onAreaChange = (ev) => {
    let new_area = ev.target.value;
    fetch(`https://data.edd.ca.gov/resource/pwxn-y2g5.json?wage_type=Annual wage or salary&area_name=${new_area}&$limit=10000`)
    .then(response => response.json())
    .then(data => {
        this.setState({
          data : data.filter(el => el.year > 2010).filter(el => el.occupational_title.length < 20),
          area_selection: new_area,
        }, this.updateHighest);
    });
  }

  render() {

    return (
      <div>
        <h1>Occupation Statistics changes in California</h1>
        <label className="Areas-label">To zoom in on smaller areas of California: </label>
        <div  className="Area--select center-element">
          <Dropdown
            options={this.state.areas}
            onDropDownOptions={this.onAreaChange} 
          /> 
        </div>
        <div className="Container">
            <div className="Occupations">
                <label>Choose occupations to compare:</label>
                <Dropdown
                  name="occupation_select_1"
                  id="first-select"
                  options={this.state.data}
                  onDropDownOptions={this.onOptionChange} 
                />
                <Dropdown
                  name="occupation_select_2"
                  id="second-select"
                  options={this.state.data}
                  onDropDownOptions={this.onOptionChange} 
                />
            </div>
            <ButterflyChart 
              occupation_select_1={this.state.occupation_select_1}
              occupation_select_2={this.state.occupation_select_2}
              data={this.state.data}
              highest_employed={this.state.highest_employed}
            >
              
            </ButterflyChart>
        </div> 
        <p>*Missing bars on the chart means there is no data available.</p>   
    </div>
    );
  }
}

export default App;
