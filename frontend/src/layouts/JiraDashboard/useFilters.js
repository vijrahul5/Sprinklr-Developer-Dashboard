import { useState, useEffect } from "react";
import axios from "axios";
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
