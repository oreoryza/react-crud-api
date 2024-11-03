import React from "react";

function StudentTable({
  students,
  onEdit,
  onDelete,
  onInfo,
  onAdd,
  onSearch,
  searchTerm,
  loading,
}) {
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
      <h1>Student Data List</h1>
      {loading && <div className="loader ms-5"></div>}
      </div>
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
          <i className="bi bi-plus-lg me-2"></i>
          Add Student
        </button>
      </div>
      <table className="table table-striped table-bordered table-hover table-responsive">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="hidden-table">NIM</th>
            <th>Class</th>
            <th className="hidden-table">Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{student.name}</td>
              <td className="hidden-table">{student.nim}</td>
              <td>{student.class}</td>
              <td className="hidden-table">{student.year}</td>
              <td>
                <button
                  onClick={() => onEdit(student)}
                  className="btn btn-sm btn-primary my-1 me-1"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="btn btn-sm btn-danger my-1 me-1"
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  onClick={() => onInfo(student.id)}
                  className="btn btn-sm btn-success my-1"
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
