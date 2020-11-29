import {Component} from 'react';

export default class StudentForm extends Component{

    constructor(props) {
      super(props);
      this.state = {
        initial_state: {
          "name": "",
          "email": "",
          "age": 0,
          "grade": "",
          "number": "",
          "address": ""
        },
        data: this.props.studentData? this.props.studentData : {
          "name": "",
          "email": "",
          "age": 0,
          "grade": "",
          "number": "",
          "address": ""
        },
        active: this.props.active,
        method: this.props.method
      }
      // if(this.state.data) delete this.state.data['_id']
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.resetForm = this.resetForm.bind(this);
    }
    
    resetForm(e){
      e.preventDefault()
      this.setState({data: this.state.initial_state, active: 0})
    }
  
    handleChange(e){
      if(e.target.name && e.target.value){
        let tmp = this.state.data
        tmp[e.target.name] = e.target.value
        this.setState({ 
          data: tmp
        }) 
      }
    }
  
    handleSubmit(e){
      e.preventDefault()
      let url = ''
      if(this.state.method === 'POST') {
        url = 'http://127.0.0.1:5000/students'
      } 
      if(this.state.method === 'PUT'){
        let id = this.props.studentData['_id']['$oid']
        delete this.state.data['_id']
        url = `http://127.0.0.1:5000/students/${id}`
      }
      fetch(url, {
        method: this.state.method,
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.data),
      }).then((response) => {
        })
        .then((message) => {
          this.setState({active: 0})
          return
        });
    };
  
    getInputValue(input){
      if(this.props.studentData){
        return this.props.studentData[input]
      }
      return ''
    }
  
    render() {
      return (
        this.state.active? 
        <form 
          onSubmit={this.handleSubmit} className="bg-light mb-4 p-4 studentForm">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                className="form-control form-control-sm" 
                name="name" 
                id="name" 
                placeholder="Student Name" 
                defaultValue={this.getInputValue('name')} 
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input 
                onChange={this.handleChange}
                type="email" 
                className="form-control form-control-sm" 
                name="email" 
                id="email" 
                placeholder="Student Email" 
                defaultValue={this.getInputValue('email')} 
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="age">Age</label>
              <input 
                onChange={this.handleChange}
                type="number" 
                className="form-control form-control-sm" 
                name="age" 
                id="age" 
                min="1"
                defaultValue={this.getInputValue('age')} 
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="grade">Grade</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                className="form-control form-control-sm" 
                name="grade" 
                id="grade"
                defaultValue={this.getInputValue('grade')} 
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="number">Number</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                className="form-control form-control-sm" 
                name="number" 
                id="number" 
                defaultValue={this.getInputValue('number')} 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
              <input 
                onChange={this.handleChange}
                type="text" 
                className="form-control form-control-sm" 
                name="address" 
                id="address" 
                placeholder="Student Email" 
                defaultValue={this.getInputValue('address')} 
              />
          </div>
          <button type="submit" className="btn btn-sm btn-primary mr-2">Send</button>
          <button onClick={this.resetForm} className="btn btn-sm btn-secondary mr-2">Cancel</button>
        </form>
        : ''
      )
    }
  
  }
  