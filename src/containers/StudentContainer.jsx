import React, { Component } from "react";
import { post, get, remove, update, detail } from "../utils/api";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import StudentDetail from "../components/StudentDetail";

class StudentContainer extends Component {
  state = {
    students: [],
    currentStudent: {},
    isModalOpen: false,
    isEdit: false,
    isDetailOpen: false,
    selectedStudent: null,
    searchTerm: "",
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    get()
      .then(({ data }) => {
        this.setState({ students: data });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  handleAddStudent = () => {
    this.setState({ 
      isModalOpen: true, 
      isEdit: false, 
      currentStudent: {
        name: "",
        nim: "",
        class: "",
        year: "",
        gender: "",
        birthDate: "",
        address: "",
        guardian_name: "",
      } 
    });
  };

  handleEditStudent = (student) => {
    this.setState({ isModalOpen: true, isEdit: true, currentStudent: student });
  };

  handleDeleteStudent = (id) => {
    remove(id)
      .then(() => {
        this.fetchStudents();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  handleInfoStudent = (id) => {
    detail(id)
      .then((response) => {
        this.setState({
          selectedStudent: response,
          isDetailOpen: true,
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    
    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        [name]: value
      }
    }));
  };

  handleSubmit = () => {
    const { currentStudent, isEdit } = this.state;
    
    const apiCall = isEdit 
      ? update(currentStudent, currentStudent.id)
      : post(currentStudent);

    apiCall
      .then(() => {
        this.fetchStudents();
        this.setState({ isModalOpen: false });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  toggleModal = () => {
    this.setState(() => ({ isModalOpen: this.isModalOpen }));
  };

  toggleDetailModal = () => {
    this.setState(() => ({ isDetailOpen: this.isDetailOpen }));
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  filterStudents = () => {
    const {students, searchTerm} = this.state;
    
    return students.filter((student) => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.year.toString().includes(searchTerm)
  );
  }

  render() {
    const {  
      currentStudent, 
      isModalOpen, 
      isEdit, 
      isDetailOpen, 
      selectedStudent,
      searchTerm
    } = this.state;

    return (
      <div className="container mt-4">
        <StudentTable
          students={this.filterStudents()}
          onAdd={this.handleAddStudent}
          onEdit={this.handleEditStudent}
          onDelete={this.handleDeleteStudent}
          onInfo={this.handleInfoStudent}
          onSearch={this.handleSearch}
          searchTerm={searchTerm}
        />
        {isModalOpen && (
          <StudentForm
            toggleModal={this.toggleModal}
            student={currentStudent}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            isEdit={isEdit}
          />
        )}
        {isDetailOpen && (
          <StudentDetail
            student={selectedStudent}
            toggleModal={this.toggleDetailModal}
          />
        )}
      </div>
    );
  }
}

export default StudentContainer;