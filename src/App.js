import React, { Component } from 'react';
import './App.css';
import StudentList from './StudentList';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addStudent, deleteStudent, updateStudent } from './actions/studentActions'

class App extends Component {
  constructor(props) {
    super(props)

    this.editStudentSubmit = this.editStudentSubmit.bind(this)
    this.deleteStudent = this.deleteStudent.bind(this)
    this.addNewStudent = this.addNewStudent.bind(this)
  }

  // componentWillMount() {
  //   let studentList = JSON.parse(localStorage.getItem('students'))
  //   this.setState((prevState, props) => ({
  //     studentList: studentList
  //   }))
  // }

  addNewStudent() {
    this.props.addStudent({
      id: Math.max(...this.props.studentList.map(function (o) {
        return o.id
      })) + 1, name: '', grade: 1, school: ''
    })
  }

  deleteStudent(id) {
    let response = window.confirm("Do you want to delete this item?")
    if (response === true) {
      this.props.deleteStudent(id)
    }
  }

  editStudentSubmit(id, name, grade, school) {
    this.props.updateStudent(id, name, grade, school)
  }

  render() {
    return (
      <div className="container-fluid" >
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                Student Registry
              </div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th><th>Grade</th><th>School</th><th>Edit/Save</th><th>Delete</th>
                    </tr>
                  </thead>
                  <StudentList
                    deleteStudent={this.deleteStudent}
                    studentList={this.props.studentList}
                    editStudentSubmit={this.editStudentSubmit}
                  />
                </table>
                <button className="btn btn-dark pull-left"
                  onClick={this.addNewStudent}>Add New</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addStudent: addStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
