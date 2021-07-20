import react from "react";
import useFilters from "../useFilters";
import { renderHook } from "@testing-library/react-hooks";

describe("useFilters", () => {
  test("basic-test", () => {
    const { result } = renderHook(() => useFilters());
  });
});
