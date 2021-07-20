import React from "react";
import Instruction from "../Instruction";
import { render } from "@testing-library/react";
let instructions = ["Instruction test 1", "Instruction test 2"];
describe("Instruction", () => {
  test("Check instruction rendering", () => {
    const { getByText } = render(<Instruction instructions={instructions} />);
    expect(getByText("1. Instruction test 1")).toBeInTheDocument();
    expect(getByText("2. Instruction test 2")).toBeInTheDocument();
  });
});
