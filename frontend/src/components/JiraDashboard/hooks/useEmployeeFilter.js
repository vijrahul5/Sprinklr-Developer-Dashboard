//hooks
import { useEffect } from "react";
import PropTypes from "prop-types";

//hooks
import useFetchEmployeeTeamData from "../../../hooks/useFetchEmployeeTeamData";

let employeeDetails = [];
const useEmployeeFilter = (user) => {
  const [loading, data, error] = useFetchEmployeeTeamData();
  const selfDetail = {
    label: "Assigned to me",
    id: user.email,
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
useEmployeeFilter.propTypes = {
  user: PropTypes.object,
};

export default useEmployeeFilter;
