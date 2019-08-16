import axios from "axios";

import loginSuccess from "../../redux/actions/auth/loginSuccess";

export const loginApiCall = (BASE_URL, payload) => {
    return axios
        .post(BASE_URL + '/login', payload)

        .then((response) => {
            /* handle other response codes */
            if(response.status === 200){
              loginSuccess({
                accessToken: response.data.access_token 
              });
            }
          })

          .catch((loginError) => {
            console.log(loginError);
          })
}
