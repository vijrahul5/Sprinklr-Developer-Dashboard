//hooks
import { useEffect } from "react";

//hooks
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";

let employeeDetails = [];
const useEmployeeFilter = () => {
  const [loading, data, error] = useFetchEmployeeTeamData();
  const selfDetail = {
    label: "",
    id: "",
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
