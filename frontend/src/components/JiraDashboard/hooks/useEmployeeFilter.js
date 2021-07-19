//hooks
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//hooks
let listOfFilters = [];
const useEmployeeFilter = (user) => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const selfDetail = {
    label: "Assigned to me",
    id: user.email,
  };
  const teamDetails = {
    label: "My team",
    id: "myteam",
  };

  async function getEmployees() {
    let response = await axios.get("/api/employee/team");
    if (response.data.status === "Success") {
      listOfFilters = response.data.teamStandUp.map((item) => {
        return {
          label: item.name,
          id: item.email,
        };
      });
      setEmployeeDetails([selfDetail, teamDetails, ...listOfFilters]);
    }
  }
  // const res = await axios.get("/api/employee/team");
  useEffect(() => {
    getEmployees();
  }, []);

  return { employeeDetails };
};
useEmployeeFilter.propTypes = {
  user: PropTypes.object,
};

export default useEmployeeFilter;
