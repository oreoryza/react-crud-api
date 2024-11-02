import React from "react";

function StudentTable({
  students,
  onEdit,
  onDelete,
  onInfo,
  onAdd,
  onSearch,
  searchTerm,
}) {
  return (
    <div>
      <h1>Student Data List</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control search-cstm"
            placeholder="Search by..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
        <button onClick={onAdd} className="btn btn-outline-primary float-end">
          Add Student
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>NIM</th>
            <th>Class</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.nim}</td>
              <td>{student.class}</td>
              <td>{student.year}</td>
              <td>
                <button
                  onClick={() => onEdit(student)}
                  className="btn btn-sm btn-primary"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="btn btn-sm btn-danger mx-1"
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  onClick={() => onInfo(student.id)}
                  className="btn btn-sm btn-success"
                >
                  <i className="bi bi-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
