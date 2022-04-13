import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Config } from "../../helpers/flutterwaveconfig";
import PrimaryButton from "../PrimaryButton";
import Modal from "../../components/Modal";
import { ReactComponent as Success } from "../../assets/images/checked.svg";
import { ReactComponent as Error } from "../../assets/images/red-cross-mark.svg";
import "./FlutterwaveHook.css";

export default function FlutterWaveHook(props) {
  const { amount, name, email } = props;
  const handleFlutterPayment = useFlutterwave(
    Config(amount, { name: name, email: email })
  );
  const [paymentStatus, setPaymentStatus] = useState("");
  const [viewPaymentStatus, setViewPaymentStatus] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState({
    amount: 0,
    currency: "UGX",
    flw_ref: "",
  });

  const handlePaymentStatusChange = (status) => {
    setPaymentStatus(status);
  };

  const generatePaymentReceipt = (response) => {
    if (response.amount !== undefined && response.currency !== undefined && response.flw_ref !== undefined) {
      setPaymentReceipt({
        amount: response.amount,
        currency: response.currency,
        flw_ref: response.flw_ref,
      });
    }
  };

  const openPaymentStatusModal = () => {
    setViewPaymentStatus(true);
  };

  const closePaymentStatusModal = () => {
    setViewPaymentStatus(false);
  };
  return (
    <div>
      <PrimaryButton
        label={"Pay Bill"}
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              //send response to backend has transaction id and status
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
              // Show status to user
              handlePaymentStatusChange(response.status);
              openPaymentStatusModal();
              if (response.status === "successful") {
                generatePaymentReceipt(response);
              }
            },
            onClose: () => {},
          });
        }}
      />

      {paymentStatus !== "" && viewPaymentStatus && (
        <Modal
          showModal={viewPaymentStatus}
          onClickAway={closePaymentStatusModal}
        >
          <div className="StatusBody">
            {paymentStatus === "successful" && viewPaymentStatus ? (
              <>
                <Success />
                <div className="StatusInfo Success">
                  Transaction successful!
                </div>
                <div>A receipt has been sent to your email</div>
                <div className="StatusGroup">
                  <div className="StatusLabel">Total Payment Amount</div>
                  <div className="StatusDetail Amount">
                  {paymentReceipt.currency}&nbsp;{paymentReceipt.amount.toLocaleString('en-US')}
                  </div>
                </div>
                <div className="StatusGroup">
                  <div className="StatusLabel">Transaction Reference</div>
                  <div className="StatusDetail">{paymentReceipt.flw_ref}</div>
                </div>
              </>
            ) : (
              paymentStatus !== "successful" &&
              viewPaymentStatus && (
                <>
                  <Error />
                  <div className="StatusInfo">Sorry!</div>
                  <div>
                    Your transaction has failed, please try again. If this
                    continues please contact support
                  </div>
                </>
              )
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
