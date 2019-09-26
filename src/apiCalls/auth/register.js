import axios from "axios";

// import { loginApiCall } from './login';
import registrationFailure from '../../redux/actions/auth/registrationAction';

export const registerUserAPI = (name, email, password, BASE_URL) => {
  return axios.post(BASE_URL + '/register', {
    name,
    email,
    password
  })
    .then((response) => {
      console.log(response);
      if(response.status === 201){
        /* log the user in and get access token */
        // loginApiCall(BASE_URL, {email, password});
      }
    })
    .catch((registerationError) => {
      console.log(registerationError)
      /* update store with error */
      registrationFailure({
        message: registerationError.response.data.message
      });
    })
}