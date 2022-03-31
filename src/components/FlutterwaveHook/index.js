import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import {
    Config
  } from "../../helpers/flutterwaveconfig";
  import PrimaryButton from "../PrimaryButton";

export default function FlutterWaveHook(props) {
    const {
        amount, 
       name,
       email,
       } = props;
  const handleFlutterPayment = useFlutterwave(Config(amount,{name:name,email:email}));
  return (
    <div >

       <PrimaryButton
         label={"Pay Bill"}
         onClick={() => {
             handleFlutterPayment({
            callback: (response) => {
            //send response to backend has transaction id and status
             console.log(response);
             closePaymentModal() // this will close the modal programmatically
              },
            onClose: () => {},
             });
         }}
      /> 
      
    </div>
  );
}