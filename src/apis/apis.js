import axios from "../axios";
// such a function is reusable, more like this can be made
export const handleAppMetricsPostRequest = (data,endpoint) => {
    return new Promise((resolve,reject)=>{
        axios
        .post(endpoint, {
          data,
        })
        .then((response) =>{
         resolve(response)
         })
        .catch((error) => {
          reject(error)
        });
    }) 
};