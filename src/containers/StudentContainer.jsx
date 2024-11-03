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
    loading: false,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    get()
      .then(({ data }) => {
        this.setState({ students: data, loading: true });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        this.setState({ loading: false });
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
      },
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
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        alert("Student deleted successfully");
      });
  };

  handleInfoStudent = (id) => {
    detail(id)
      .then((response) => {
        this.setState({
          selectedStudent: response, //Menggunakan selected student untuk menyimpan data student yang dipilih
          isDetailOpen: true,
          loading: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(
      (prevState) => ({
        currentStudent: {
          ...prevState.currentStudent,
          [name]: value,
        },
      }),
      () => {
        if (name === "nim") {
          const isDuplicate = this.checkNIM(value);
          const nimInput = document.getElementById("nim");
          if (isDuplicate) {
            nimInput.setCustomValidity("Must be unique.");
          } else {
            nimInput.setCustomValidity("");
          }
        }
      }
    );
  };

  //validasi untuk unique nim
  checkNIM = (nim) => {
    const { students, currentStudent, isEdit } = this.state;

    if (isEdit) {
      return students.some(
        (student) => student.nim === nim && student.id !== currentStudent.id
      );
    }
    return students.some((student) => student.nim === nim);
  };

  handleSubmit = () => {
    const { currentStudent, isEdit } = this.state;

    this.setState({ loading: true });

    const apiCall = isEdit
      ? update(currentStudent, currentStudent.id)
      : post(currentStudent);

    apiCall
      .then(() => {
        this.fetchStudents();
        this.setState({ isModalOpen: false });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        this.setState({ loading: false });
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
    const { students, searchTerm } = this.state;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.year.toString().includes(searchTerm)
    );
  };

  render() {
    const {
      currentStudent,
      isModalOpen,
      isEdit,
      isDetailOpen,
      selectedStudent,
      searchTerm,
      loading
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
          loading={loading}
        />
        {isModalOpen && (
          <StudentForm
            toggleModal={this.toggleModal}
            student={currentStudent}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            isEdit={isEdit}
            loading={loading}
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
