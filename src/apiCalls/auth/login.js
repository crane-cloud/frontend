import axios from "axios";

import loginSuccess from "../../redux/actions/auth/loginSuccess";
import loginFailure from "../../redux/actions/auth/loginFailure";

export const loginApiCall = (BASE_URL, payload) => {
    debugger;
    return axios
        .post(BASE_URL + '/login', payload)

        .then((response) => {
            /* handle other response codes */
            if(response.status === 200){
              loginSuccess({
                accessToken: response.data.access_token 
              });
            } else {
              /* do something basing on status codes */
            }
          })

          .catch((loginError) => {
            console.log(loginError);
            /* dispatch login failure error */
            loginError.response.status === 401 ?
            loginFailure({
              message: "Wrong email or Password"
            })
            :
            loginFailure({
              message: loginError.response.data.message
            });
          })
}
