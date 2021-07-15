//libraries
import axios from "axios";

//hooks
import { useState, useEffect } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState([]);

  async function getFilters() {
    let response = await axios.get("/api/jira/getFilters");
    if (response.data.status === "Success") {
      let listOfFilters = response.data.data.map((item) => {
        return {
          label: item.name,
          id: item.id,
        };
      });
      setFilters(listOfFilters);
    }
  }

  useEffect(() => {
    getFilters();
  }, []);
  return { filters };
};

export default useFilters;
