import React, { useState, useEffect } from "react";

function UserActivityLogs() {
  const [filters, setFilters] = useState({
    a_user_id: "",
    start: "",
    end: "",
  });

  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  const generateApiLink = () => {
    let link = "http://127.0.0.1:5000/users/activities";
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        link += `${key}=${value}&`;
      }
    });
    return link;
  };

  handleGetRequest = ("http://127.0.0.1:5000/users/activities") => {
    return new Promise((resolve,reject)=>{
        axios
        .get("http://127.0.0.1:5000/users/activities")
        .then((response) =>{
         resolve(response)
         })
        .catch((error) => {
          reject(error)
        });
    }) 
  };

  useEffect(() => {
    fetchData();
  }, [filters, token]);

  return (
    <div>
      <h1>UserActivityLogs</h1>
      {/* Render data */}
    </div>
  );
}

export default UserActivityLogs;
