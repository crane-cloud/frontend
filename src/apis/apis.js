import axios from "../axios";
// such a function is reusable, more like this can be made
export const handlePostRequestWithDataObject = (data,endpoint) => {
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
export const handlePostRequestWithOutDataObject = (data,endpoint) => {
  return new Promise((resolve,reject)=>{
      axios
      .post(endpoint, 
        data,
      )
      .then((response) =>{
       resolve(response)
       })
      .catch((error) => {
        reject(error)
      });
  }) 
};

export const handleGetRequest = (endpoint) => {
  return new Promise((resolve,reject)=>{
      axios
      .get(endpoint)
      .then((response) =>{
       resolve(response)
       })
      .catch((error) => {
        reject(error)
      });
  }) 
};

export const handlePatchRequest = (endpoint,data) => {
  return new Promise((resolve,reject)=>{
      axios
      .patch(endpoint, data)
      .then((response) =>{
       resolve(response)
       })
      .catch((error) => {
        reject(error)
      });
  }) 
};
export const handleDeleteRequest = (endpoint,data) => {
  return new Promise((resolve,reject)=>{
      axios
      .delete(endpoint,data)
      .then((response) =>{
       resolve(response)
       })
      .catch((error) => {
        reject(error)
      });
  }) 
};