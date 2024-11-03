import React from "react";

function StudentForm({ toggleModal, student, onChange, onSubmit, isEdit, loading }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title d-flex justify-content-between align-items-center">
            {isEdit ? "Edit Student" : "Add New Student"}
            {loading && <div className="loader ms-5"></div>}
          </h3>
          <button
            onClick={toggleModal}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body overflow-auto">
          <form className="px-2 was-validated" novalidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={onChange}
                value={student.name}
                className="form-control"
                id="name"
                minLength={3}
                required
              />
              <div className="invalid-feedback">Must be at least 3 characters.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="nim" className="form-label">
                NIM
              </label>
              <input
                type="text"
                value={student.nim}
                onChange={onChange}
                name="nim"
                className="form-control"
                id="nim"
                required
              />
              <div className="invalid-feedback">Must be unique.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">
                Year
              </label>
              <input
                type="number"
                value={student.year}
                onChange={onChange}
                name="year"
                className="form-control"
                id="year"
                inputMode="numeric"
                minLength={4}
                maxLength={4}
                min={2000}
                max={2024}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="class" className="form-label">
                Class
              </label>
              <input
                type="text"
                value={student.class}
                onChange={onChange}
                name="class"
                className="form-control"
                id="class"
                required
              />
              <div className="invalid-feedback">Pleade provide a valid class.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="form-select"
                value={student.gender}
                onChange={onChange}
                required
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="invalid-feedback">Pleade provide a valid gender.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">
                Birth Date
              </label>
              <input
                type="date"
                value={student.birthDate}
                onChange={onChange}
                name="birthDate"
                className="form-control"
                id="birthDate"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                name="address"
                value={student.address}
                onChange={onChange}
                className="form-control"
                id="address"
                minLength={20}
                required
              />
              <div className="invalid-feedback">Must be at least 20 characters.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="guardian_name" className="form-label">
                Guardian Name
              </label>
              <input
                type="text"
                value={student.guardian_name}
                onChange={onChange}
                name="guardian_name"
                className="form-control"
                id="guardian_name"
                required
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={onSubmit} type="submit" className="btn btn-primary m-3">
            {isEdit ? (
              <>
                <i className="bi bi-pencil"></i> Update
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg"></i> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
