import React, { useState } from "react";
import "./Input.scss";
import { FaSearch } from "react-icons/fa";

export default function Input({
  inputType = "text",
  inputLabel,
  inputPlaceholder,
  inputName,
  onChange,
  inputValue,
  step,
  min,
}) {
  return (
    <div className="form__group field">
      <input
        type={inputType}
        className="form__field"
        placeholder={inputPlaceholder}
        name={inputName}
        value={inputValue}
        onChange={onChange || null}
        step={step || null}
        min={min || null}
        required
      />
      <label htmlFor={inputName} className="form__label">
        {inputLabel}
      </label>
    </div>
  );
}

export function Select({
  options,
  inputLabel,
  inputName,
  onChange,
  inputValue,
}) {
  return (
    <div className="form__group field">
      <select
        className="form__field"
        name={inputName}
        value={inputValue}
        onChange={onChange || null}
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={inputName} className="form__label">
        {inputLabel}
      </label>
    </div>
  );
}

export function CheckBox({ inputName, inputLabel, inputValue, onChange }) {
  return (
    <div className="form-checkbox">
      <input
        type="checkbox"
        id={inputName}
        checked={inputValue}
        onChange={onChange}
        className="checkbox"
      />
      <label htmlFor={inputName}>{inputLabel}</label>
    </div>
  );
}

export function Label({ inputLabel, inputValue, inputType = "text" }) {
  return (
    <div className="form__group field">
      <input
        type={inputType}
        disabled={true}
        className="form__field"
        placeholder={inputLabel}
        name={inputValue}
        value={inputValue || ""}
        required
      />
      <label htmlFor={inputValue} className="form__label">
        {inputLabel}
      </label>
    </div>
  );
}

export function SearchField({
  inputValue,
  inputName,
  onChange,
  inputLabel,
  onSubmit,
}) {
  return (
    <div className="form__group field search">
      <input
        type="text"
        label={inputLabel}
        className="form__field"
        placeholder={inputLabel}
        name={inputName}
        value={inputValue}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit();
          }
        }}
        required
      />
      <label htmlFor={inputName} className="form__label">
        {inputLabel}
      </label>
      <FaSearch className="searchIcon" onClick={onSubmit} />
    </div>
  );
}
