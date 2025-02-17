import React from "react";

function InputType({ num, index, handleChange }) {
  return (
    <input
      type="number"
      value={num}
      onChange={(e) => handleChange(index, e.target.value)}
      className="p-3 rounded border-2 border-yellow-500 focus:outline-none"
    />
  );
}

export default InputType;
