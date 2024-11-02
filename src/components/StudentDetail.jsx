import React from 'react'

function StudentDetail({toggleModal, student}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Student Detail</h5>
          <button
            onClick={() => toggleModal()}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p>
            <strong>Student Name:</strong><br /> {student.data.name}
          </p>
          <p>
            <strong>NIM:</strong><br /> {student.data.nim}
          </p>
          <p>
            <strong>Year:</strong><br /> {student.data.year}
          </p>
          <p>
            <strong>Class:</strong><br /> {student.data.class}
          </p>
          <p>
            <strong>Gender:</strong><br /> {student.data.gender}
          </p>
          <p>
            <strong>Birth Date:</strong><br /> {student.data.birthDate}
          </p>
          <p>
            <strong>Address:</strong><br /> {student.data.address}
          </p>
          <p>
            <strong>Guardian:</strong><br /> {student.data.guardian_name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail