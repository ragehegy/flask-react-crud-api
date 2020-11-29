import {Component} from 'react';
import StudentForm from './form';

export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      original: [],
      sort: {
        column: null,
        direction: ''
      },
      formActive: 0,
      studentData: {
        "name": "",
        "email": "",
        "age": 0,
        "grade": "",
        "number": "",
        "address": ""
      },
      editActive: 0,
      addActive: 0
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/students/get")
    .then(function(response) {
      return response.json();
    })
    .then(items => {
      this.setState({data: items, original: items})
      return items
    });
  }
  
  async deleteUser(user) {
    const id = user._id.$oid
    fetch(`http://127.0.0.1:5000/students/${id}`, {
      method: 'DELETE'
    }).then((response) => {
        // response.json();
    })
    .then((message) => {
      this.setState({data: this.state.data.filter(function(person) { 
        return person !== user
      })});
    });
  }
  
  updateRow(student) {
    this.setState({studentData: student, editActive: !this.state.editActive})
  }
  
  addRow() {
    this.setState({addActive: !this.state.addActive})
  }
  
  onSort = (column) => (e) => {
    const direction = this.state.sort.column ? (
      this.state.sort.direction === 'asc' ? 'desc' : (this.state.sort.direction === 'desc'? '' : 'asc')
    ) : 'asc';

    const sortedData = this.state.data.sort((a, b) => {
      let valueA = a[column]
      let valueB = b[column]
      if (column !== 'age') {
        valueA = a[column].toUpperCase();
        valueB = b[column].toUpperCase();
      }
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      if (valueA === valueB){
        if(column !== 'grade'){
            if(a['grade'] <= b['grade']){return 1} else {return -1}
        }
        else{
            if(a['name'].toUpperCase() <= b['name'].toUpperCase()){return 1} else {return -1}
        }
      }

      return 0;
    });

    if (direction === 'desc') {
      sortedData.reverse();
      this.setState({
        data: sortedData,
        sort: {
          column,
          direction,
        }
      });
    }
    if (direction === 'asc') {
      this.setState({
        data: sortedData,
        sort: {
          column,
          direction,
        }
      });
    }
    if(direction === ''){
      this.setState({
        data: this.state.original,
        sort: {
          column: '',
          direction: '',
        }
      });
    }
    
  };

  setArrow = (column) => {
    let className = 'sort-direction-';
    
    if (this.state.sort.column === column) {
      className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
      className += ' bg-light'
    }
    
    return className;
  };

  render() {
    return (
      <div>
      {this.state.editActive? 
        <StudentForm studentData={this.state.studentData} active={1} method='PUT' /> : ''}
      {this.state.addActive? 
        <StudentForm active={1} method='POST' /> 
        : ''}
      <table className="table table-striped">
        <thead>
          <tr>
            <th 
              onClick={this.onSort('name')}
              className={this.setArrow('name')}
            >
              Name
              {this.state.sort.column === 'name' ? 
              <small className="float-right">
                {
                  this.state.sort.direction === 'asc' ? '(asc)' : 
                  (this.state.sort.direction === 'desc' ? '(desc)' : '')
                }
              </small>
              : ''}
            </th>
            <th 
              onClick={this.onSort('email')}
              className={this.setArrow('email')}
            >
              Email
              {this.state.sort.column === 'email' ? 
              <small className="float-right">
                {
                  this.state.sort.direction === 'asc' ? '(asc)' : 
                  (this.state.sort.direction === 'desc' ? '(desc)' : '')
                }
              </small>
              : ''}
            </th>
            <th 
              onClick={this.onSort('age')}
              className={this.setArrow('age')}
            >
              Age
              {this.state.sort.column === 'age' ? 
              <small className="float-right">
                {
                  this.state.sort.direction === 'asc' ? '(asc)' : 
                  (this.state.sort.direction === 'desc' ? '(desc)' : '')
                }
              </small>
              : ''}
            </th>
            <th 
              onClick={this.onSort('grade')}
              className={this.setArrow('grade')}
            >
              Grade
              {this.state.sort.column === 'grade' ? 
              <small className="float-right">
                {
                  this.state.sort.direction === 'asc' ? '(asc)' : 
                  (this.state.sort.direction === 'desc' ? '(desc)' : '')
                }
              </small>
              : ''}
            </th>
            <th 
              onClick={this.onSort('number')}
              className={this.setArrow('number')}
            >
              Number
              {this.state.sort.column === 'number' ? 
              <small className="float-right">
                {
                  this.state.sort.direction === 'asc' ? '(asc)' : 
                  (this.state.sort.direction === 'desc' ? '(desc)' : '')
                }
              </small>
              : ''}
            </th>
            <th 
              onClick={this.onSort('address')}
              className={this.setArrow('address')}
            >
              Address
              {this.state.sort.column === 'address' ? 
              <small className="float-right">
                {
                  this.state.sort.direction === 'asc' ? '(asc)' : 
                  (this.state.sort.direction === 'desc' ? '(desc)' : '')
                }
              </small>
              : ''}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((student, index) =>(
              <tr key={index}>
                <td data-title="Name">{student.name}</td>
                <td data-title="Email">{student.email}</td>
                <td data-title="Age">{student.age}</td>
                <td data-title="Grade">{student.grade}</td>
                <td data-title="Number">{student.number}</td>
                <td data-title="Address">{student.address}</td>
                <td>
                  <div className="btn-group" key={index}>
                    <button onClick={() => this.updateRow(student)} className="btn btn-sm btn-warning">
                      E
                    </button>
                    <button onClick={() => this.deleteUser(student)} className="btn btn-sm btn-danger">
                      D
                    </button>
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
       <button onClick={() => this.addRow()} className="btn btn-lg btn-success create-btn">
        Add
      </button>
      </div>
    );
  }
}
