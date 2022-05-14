import React from "react";
const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-select" name={name} id={name} {...rest}>
        <option value="" />
        {options.map((o) => (
          <option value={o._id} key={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
