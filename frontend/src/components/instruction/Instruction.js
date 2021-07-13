import React from "react";
import PropTypes from "prop-types";

const Instruction = ({ instructions }) => {
  return (
    <>
      <ul className="instruction">
        {instructions.map((instruction, index) => {
          return (
            <li className="instruction__item">
              {index + 1}. {instruction}
            </li>
          );
        })}
      </ul>
    </>
  );
};
Instruction.propTypes = {
  instruction: PropTypes.array,
};

export default Instruction;
