import React from "react";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  options,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="">{defaultOption}</option>
        {options.map((option) => {
          return (
            <options key={option.value} value={option.value}>
              {option.text}
            </options>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error} </div>}
    </div>
  );
};
export default SelectInput;
