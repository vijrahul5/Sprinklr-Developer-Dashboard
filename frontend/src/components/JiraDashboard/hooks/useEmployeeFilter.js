import { useState, useEffect } from "react";
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";
let employeeDetails = [];
const useEmployeeFilter = () => {
  const [loading, data, error] = useFetchEmployeeTeamData();
  const selfDetail = {
    label: "Assigned to me",
    id: "harshrajani460@gmail.com",
  };
  useEffect(() => {
    if (data) {
      employeeDetails = data.map((employee) => {
        return {
          label: employee.name,
          id: employee.email,
        };
      });
    }
    employeeDetails = [selfDetail, ...employeeDetails];
  }, [data]);

  return { employeeDetails };
};

export default useEmployeeFilter;
