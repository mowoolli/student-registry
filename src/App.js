import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const studentList = [
  { id: 1, name: 'John Doe', grade: 1, school: 'React Redux School' },
  { id: 2, name: 'Jane Doe', grade: 2, school: 'React Redux School' },
  { id: 1, name: 'Terry Adams', grade: 3, school: 'React Redux School' },
  { id: 1, name: 'Jenny Smith', grade: 4, school: 'React Redux School' }
]

if (localStorage.getItem('students') === null) {
  localStorage.setItem('students', JSON.stringify(studentList))
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studentList: []
    }

    this.editStudentSubmit = this.editStudentSubmit.bind(this)
    this.deleteStudent = this.deleteStudent.bind(this)
    this.addNewStudent = this.addNewStudent.bind(this)
  }

  componentWillMount() {
    let studentList = JSON.parse(localStorage.getItem('students'))
    this.setState((prevState, props) => ({
      studentList: studentList
    }))
  }

  addNewStudent() {
    this.setState((prevState, props) => ({
      studentList: [...prevState.studentList, {
        id: Math.max(...prevState.studentList.map(function (o) {
          return o.id
        })) + 1, name: '', grade: 1, school: ''
      }]
    }))
  }

  deleteStudent(id) {
    let response = window.confirm("Do you want to delete this item?")
    if (response === true) {
      let filteredStudentList = this.state.studentList.filter(
        x => x.id !== id
      )

      this.setState((prevState, props) => ({
        studentList: filteredStudentList
      }))

      localStorage.setItem(
        'students', JSON.stringify(filteredStudentList)
      )
    }
  }

  editStudentSubmit(id, name, grade, school) {
    let studentListCopy = this.setState.studentList.map((student) => {
      if (student.id === id) {
        student.name = name
        student.grade = grade
        student.school = school
      }
      return student
    })

    this.setState((prevState, props) => ({
      studentList: studentListCopy
    }))

    localStorage.setItem('students', JSON.stringify(studentListCopy))
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
