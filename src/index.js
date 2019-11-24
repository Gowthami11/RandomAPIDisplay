import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

class App extends Component {
  state = {
    results: [],
    persons: [],
    showChckBox: false,
    deleteDisable: true,
    indexdelete: []
  };
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get("https://randomuser.me/api/?results=11")
      .then(res =>
        this.setState({ results: res.data.results }, () => this.setPersons())
      );
    console.log("componentDidMount2");
  }

  setPersons() {
    // console.log('this.state.results',this.state.results);
    console.log("set personssss");
    let arr;
    let age;
    let persons = [];
    for (let i of this.state.results) {
      arr = Object.values(`${i.name.first} ${i.name.last}`);
      age = Object.values(i.dob)[1];
      persons.push({
        id: Math.random(),
        name: arr,
        age: age
      });
    }

    this.setState({
      persons: persons
    });
  }
  showCheckHandler = e => {
    e.preventDefault();
    this.setState({
      showChckBox: !this.state.showChckBox
    });
  };

  sorter = () => {
    const persons = [...this.state.persons];
    persons.sort(function(x, y) {
      var a = x.name.toString().toLowerCase();
      var b = y.name.toString().toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    console.log("sort persons", persons);
    this.setState({ persons, sort2: false });
  };

  show2Young = () => {
    const persons = [...this.state.persons];
    persons.sort((a, b) => a.age - b.age);
    let sort2 = [];
    sort2 = persons.slice(0, 2);
    this.setState({ persons: sort2 });
  };
  checkBoxHandler = index => {
    const indexdelete = [...this.state.indexdelete];
    indexdelete.push(index);
    //  console.log("indexdelete", indexdelete);
    this.setState({
      deleteDisable: false,
      indexdelete
    });
  };

  deleteHandler = e => {
    e.preventDefault();
    let persons = [...this.state.persons];
    let persons1 = [];
    let indexdel = [...this.state.indexdelete];

    for (let i of indexdel) {
      console.log("index del", i);

      console.log("this.state.persons before delte", this.state.persons);
      persons1 = persons.filter(pr => pr.id !== i);
      persons = persons1;
      console.log("persons", persons1);
    }
    this.setState({
      persons: persons1,
      indexdel: []
    });
    console.log("this.state.persons.length", this.state.persons.length);
    if (persons.length === 0) this.setState({ deleteDisable: true });
  };
  setStyle = () => {
    return {
      margin: "10",
      padding: "10",
      background: "#CD5C5C",
      borderRadius: "10px",
      color: "black"
    };
  };
  render() {
    console.log("hello", this.state.persons);
    return (
      <div className="App" style={{ backgroundColor: "#C0C0C0" }}>
        <button style={this.setStyle()} onClick={this.sorter}>
          Sort
        </button>
        <button style={this.setStyle()} onClick={this.show2Young}>
          2 Young
        </button>
        <button style={this.setStyle()} onClick={this.showCheckHandler}>
          Edit
        </button>
        <button
          disabled={this.state.deleteDisable}
          style={
            !this.state.deleteDisable
              ? this.setStyle()
              : { borderRadius: "10px" }
          }
          onClick={this.deleteHandler.bind(this)}
        >
          Delete
        </button>
        <hr />
        {this.state.persons.map((rs, index) => (
          <ol key={rs.id}>
            {this.state.showChckBox ? (
              <input
                type="checkbox"
                onClick={this.checkBoxHandler.bind(this, rs.id)}
              />
            ) : null}
            name:{rs.name},age:{rs.age}
          </ol>
        ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
