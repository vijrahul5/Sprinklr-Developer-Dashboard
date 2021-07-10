import { useState, useEffect } from "react";
import { useFetchEmployeeTeamData } from "../../../layouts/Team/teamHooks";

const useEmployeeFilter = () => {
  const [loading, data, error] = useFetchEmployeeTeamData();
  const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    if (data) {
      let information = data.map((employee) => {
        return {
          label: employee.name,
          id: employee.email,
        };
      });
      setEmployeeDetails(information);
    }
  }, [data]);
  return { employeeDetails };
};

export default useEmployeeFilter;
