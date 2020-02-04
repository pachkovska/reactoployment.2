import React, { Component } from 'react';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown.js';

class App extends Component {

state = {
      data: [],
      areas: ["California", "Chico MSA", "Sacramento--Roseville--Arden-Arcade MSA", "Redding MSA", "Oakland-Hayward-Berkeley Metro Div", "Napa MSA", "Modesto MSA", "Merced MSA", "Madera MSA", "Los Angeles-Long Beach-Glendale Metro Div", "San Jose-Sunnyvale-Santa Clara MSA", "San Francisco-Redwood City-South San Francisco Metro Div"],
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
            onDropDownOptions={this.onAreaChange}> 
          </ Dropdown>
        </div>
        <div className="Container">
            <div className="Occupations">
                <label>Choose occupations to compare:</label>
                <select name="occupation_select_1" id="first-select" onChange={this.onOptionChange}>
                    {
                      this.state.data.map(title => (
                      <option value={title.occupational_title}>{title.occupational_title}</ option> 
                        ))
                    }
                </select>
                <Dropdown
                name="occupation_select_1"
                id="first-select"
                options={this.state.data}>

                </Dropdown>
                <select name="occupation_select_2" className="OccupationDropdown" id="second-select" onChange={this.onOptionChange}>
                    {
                      this.state.data.map(title => (
                      <option value={title.occupational_title}>{title.occupational_title}</ option>
                        ))
                    }
                </select>
            </div>
            <div className="ChartAreaContainer Card--style">
                <div className="ChartAreaContainer-dimention">Number of employed</div>
                <div className="ChartAreaContainer-leftLabel">{this.state.occupation_select_1}
                </div>
                <div className="ChartAreaContainer-rightLabel">{this.state.occupation_select_2}
                </div>
                <div className="Graph1">
                    {
                      this.state.data.map((el) => (el.occupational_title === this.state.occupation_select_1 && el.year > 2010 ? 
  <div className="Graph1-bar"  style={{ width: Number(el.number_of_employed)/this.state.highest_employed * 100 + '%' }}>{el.number_of_employed}</div> : null
                      ))
                    }
                </div> 
                <div className="Years">
                  {
                    this.state.data.filter(el => el.occupational_title === this.state.occupation_select_1 && el.year > 2010).map(el => (el.occupational_title === this.state.occupation_select_1 && el.year > 2010 ?
                    <div>{el.year}</div> : null
                    ))
                  }
                </div>
                <div className="Graph2">
                      {
                        this.state.data.map(el => (el.occupational_title === this.state.occupation_select_2 && el.year > 2010 ? 
                        <div className="Graph2-bar" style={{ width: Number(el.number_of_employed)/this.state.highest_employed * 100 + '%' }}>{el.number_of_employed}</ div>  : null
                        ))
                      }
                </div>
            </div>
        </div>    
    </div>
    );
  }
}

export default App;
