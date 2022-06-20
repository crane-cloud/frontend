import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Pdf from "react-to-pdf";
import Header from "../Header";
import SideBar from "../SideBar";
import InformationBar from "../InformationBar";
import Modal from "../../components/Modal";
import PrimaryButton from "../PrimaryButton";
import DonutChart from "../DonutChart";
import BarGraph from "../BarGraph";
import FlutterwaveHook from "../FlutterwaveHook";
import MetricsCard from "../MetricsCard";
import SpendingPeriod from "../SpendingPeriod";
import { useParams } from "react-router-dom";
import styles from "./ProjectBillingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import getProjectBill from "../../redux/actions/getProjectBill";
import {
  DisplayDateTime,
} from "../../helpers/dateConstants";

import {
  getTransactions,
  clearTransactions,
} from "../../redux/actions/getTransactions";

const ref = React.createRef();
const options = {
  orientation: "landscape",
};

const data2 = [
  { date: "2021-08", amount: 1398 },
  { date: "2021-09", amount: 9800 },
  { date: "2021-10", amount: 3908 },
  { date: "2021-11", amount: 4800 },
  { date: "2021-12", amount: 3800 },
  { date: "2022-01", amount: 1267 },
  { date: "2022-02", amount: 1267 },
];

const ProjectBillingPage = (props) => {
  const { projectID } = useParams();
  const dispatch = useDispatch();

  const getAllTransactions = useCallback(
    () => dispatch(getTransactions(projectID)),
    [dispatch, projectID]
  );

  const clearAllTransactions = useCallback(
    () => dispatch(clearTransactions()),
    [dispatch]
  );

  const [transactionDetails, setTransactionDetails] = useState({});
  const [viewReceipt, setViewReceipt] = useState(false);
  const [currentTab, setCurrentTab] = useState("transactions");
  const [viewInvoiceFile, setViewInvoiceFile] = useState(false);
  const [viewReceiptFile, setViewReceiptFile] = useState(false);
  const [currentUsageTab, setCurrentUsageTab] = useState("days");
  const [months, setMonths] = useState(data2);
  const [days, setDays] = useState([]);

  useEffect(() => {
    clearAllTransactions();
    getAllTransactions();
  }, [clearAllTransactions, getAllTransactions]);

  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { data } = useSelector((state) => state.user);
  const { transactions } = useSelector((state) => state.getTransactionsReducer);

  const closeReceiptModal = () => {
    setViewReceipt(false);
  };

  const viewTransactions = () => {
    setCurrentTab("transactions");
  };
  const viewInvoices = () => {
    setCurrentTab("invoices");
  };
  const viewReceipts = () => {
    setCurrentTab("receipts");
  };
  const removePreview = () => {
    setViewInvoiceFile(false);
    setViewReceiptFile(false);
  };

  const viewUsageInDays = () => {
    setCurrentUsageTab("days");
  };
  const viewUsageInMonths = () => {
    setCurrentUsageTab("months");
  };

  const getBill = useCallback(
    (startTimeStamp) =>
      dispatch(
        getProjectBill(projectID, { series: true, start: startTimeStamp })
      ),
    [dispatch, projectID]
  );

  // create a function that takes in a array and returns a new array of objects with the data 2 format
  const getData2Format = useCallback(
    (data) => {
      const newData = [];
      if (Array.isArray(data)) {
        data.forEach((element) => {
          newData.push({
            date:
              currentUsageTab === "months"
                ? moment(element.start).utc().format("YYYY-MM-DD")
                : moment(element.start).utc().format("DD"),
            amount: element.totalCost * 3600,
          });
        });
      }
      // let newData2 = newData.slice(4)
      return newData;
    },
    [currentUsageTab]
  );
  // create a function that takes in a array and sums all the object key values to create one object
  const summationObject = (data) => {
    const newData = {};
    if (Array.isArray(data)) {
      data?.forEach((element) => {
        Object.keys(element).forEach((key) => {
          if (newData[key]) {
            newData[key] += element[key];
          } else {
            newData[key] = element[key];
          }
        });
      });
    }
    return newData;
  };

  useEffect(() => {
    // 7 days ago
    var startTimeStamp = new Date();
    startTimeStamp.setDate(startTimeStamp.getDate() - 14);
    getBill(Math.round(startTimeStamp.getTime() / 1000));
  }, [getBill]);

  const billInfo = useSelector((state) => state.getProjectBillReducer);
  const { projectBill } = billInfo;

  useEffect(() => {
    currentUsageTab === "months"
      ? setMonths(getData2Format(projectBill?.data?.cost_data))
      : setDays(getData2Format(projectBill?.data?.cost_data));
  }, [projectBill.data, currentUsageTab, getData2Format]);

  let newObject = summationObject(projectBill?.data?.cost_data);
  // turn values to percentages for donut chart
  const data1 = [
    {
      name: "CPU / $1 per 1K seconds",
      value:
        Object.keys(newObject).length === 0
          ? "n/a"
          : newObject.totalCost === 0
          ? 0
          : (newObject.cpuCost / newObject.totalCost) * 100,
      color: "#0088FE",
    },
    {
      name: "RAM / $4 per GB",
      value:
        Object.keys(newObject).length === 0
          ? "n/a"
          : newObject.totalCost === 0
          ? 0
          : (newObject.ramCost / newObject.totalCost) * 100,
      color: "#00C49F",
    },
    {
      name: "Network / $1 per request",
      value:
        Object.keys(newObject).length === 0
          ? "n/a"
          : newObject.totalCost === 0
          ? 0
          : (newObject.networkCost / newObject.totalCost) * 100,
      color: "#FFBB28",
    },
    { name: "Storage/ $1 per GB", value: 0, color: "#FF8042" },
    { name: "Database/ $1 per GB", value: 0, color: "#99D2E9" },
  ];

  const getProjectName = (id) => {
    return projects.find((project) => project.id === id).name;
  };
  const getTransactionDetail = (transactions, transaction_id) => {
    return transactions.find(
      (transaction) => transaction.transaction_id === transaction_id
    );
  };
  const openReceiptModal = (transactions, transaction_id) => {
    let transactionDetail = getTransactionDetail(transactions, transaction_id);
    setTransactionDetails(transactionDetail);
    setViewReceipt(true);
  };

  const openInvoiceModal = () => {
    setViewInvoiceFile(true);
  };
  const openReceiptsModal = () => {
    setViewReceiptFile(true);
  };

  const handlePeriodChange = (period, customTime = null) => {
    let startTimeStamp;
    let endTimeStamp = new Date();
    if (currentUsageTab === "months") {
      if (period === "5m") {
        startTimeStamp = new Date(
          endTimeStamp.setMonth(endTimeStamp.getMonth() - 5)
        );
        endTimeStamp = new Date();
        let newMonths = [];
        for (var i = 0; i < data2.length; i++) {
          if (new Date(data2[i].date).getTime() >= startTimeStamp.getTime())
            newMonths.push(data2[i]);
        }
        setMonths(newMonths);
      }
      if (period === "all") {
        // get all months
        setMonths(data2);
      } else if (period === "custom" && customTime !== null) {
        startTimeStamp = customTime.start;
        endTimeStamp = customTime.end;
        let newMonths = [];
        for (var n = 0; n < data2.length; n++) {
          if (
            new Date(data2[n].date).getTime() >=
              new Date(startTimeStamp).getTime() &&
            new Date(data2[n].date).getTime() <=
              new Date(endTimeStamp).getTime()
          )
            newMonths.push(data2[n]);
        }
        setMonths(newMonths);
      }
    }
    if (currentUsageTab === "days") {
      //lowest index is lowest day in data
      if (period === "14d") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 14);
        //in unix timstamp
        getBill(Math.round(startTimeStamp.getTime() / 1000));
      }
      if (period === "7d") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 7);
        getBill(Math.round(startTimeStamp.getTime() / 1000));
      }
      if (period === "3d") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 3);
        getBill(Math.round(startTimeStamp.getTime() / 1000));
      }
      if (period === "all") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 14);
        getBill(Math.round(startTimeStamp.getTime() / 1000));
      }
    }
  };
  return (
    <div className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div className={styles.SideBarSection}>
          <SideBar
            name={getProjectName(projectID)}
            params={useParams()}
            pageRoute={props.location.pathname}
            allMetricsLink={`/projects/${projectID}/metrics`}
            cpuLink={`/projects/${projectID}/cpu/`}
            memoryLink={`/projects/${projectID}/memory/`}
            databaseLink={`/projects/${projectID}/databases`}
            networkLink={`/projects/${projectID}/network/`}
          />
        </div>
        <div className={styles.MainContentSection}>
          <div>
            <InformationBar header="Project Billing" />
          </div>
          <div className={styles.SmallContainer}>
            <div className={styles.OuterContainerBorder}>
              <div className={styles.DonutChatContainer}>
                <div className={styles.InsideHeading}>
                  <div className={styles.Heading}>Month-to date Summary</div>
                </div>
                <div className={styles.InnerContainer}>
                  <div className={styles.Subtext}>
                    The chart below shows the proportion of costs spent for each
                    service you use on the platform
                  </div>
                  <DonutChart
                    center_x={60}
                    center_y={70}
                    InnerRadius={30}
                    OuterRadius={50}
                    data={data1}
                    height={150}
                    width={130}
                  />

                  <div className={styles.MonthSummary}>
                    {data1.map((entry, index) => (
                      <div className={styles.ResourseDetail} key={index}>
                        <div
                          className={styles.Cube}
                          style={{
                            background: `${data1[index % data1.length].color}`,
                          }}
                        />
                        <div className={styles.ResourceName}>
                          {data1[index % data1.length].name}
                        </div>
                        <div className={styles.ResourcePrice}>
                          {/**display in dollars, covert back form percentages to dollars*/}
                          $
                          {(
                            data1[index % data1.length].value *
                            (newObject.totalCost / 100)
                          ).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    <div className={styles.Total}>
                      <div className={styles.TotalTxt}>Total</div>
                      <div className={styles.ResourcePrice}>
                        {Object.keys(newObject).length === 0
                          ? "n/a"
                          : `$${newObject.totalCost.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                  <div className={styles.paymentButton}>
                    <FlutterwaveHook
                      amount={
                        transactionDetails.amount
                          ? transactionDetails.amount.toLocaleString("en-US") *
                            3600
                          : 0
                      }
                      name={data.name}
                      email={data.email}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.BarGraphContainer}>
                <div className={styles.InsideHeading}>
                  <div className={styles.Heading}>Usage Summary</div>
                </div>
                <div className={styles.InnerContainer}>
                  <div className={styles.Subtext}>
                    Your usage summary for the previous days/months. (UGX)
                  </div>

                  <div className={styles.UsageHistoryHeading}>
                    <span
                      className={
                        currentUsageTab === "days"
                          ? styles.CurrentTab
                          : styles.Tab
                      }
                      onClick={() => {
                        viewUsageInDays();
                      }}
                    >
                      Days
                    </span>
                    <span
                      className={
                        currentUsageTab === "months"
                          ? styles.CurrentTab
                          : styles.Tab
                      }
                      onClick={() => {
                        viewUsageInMonths();
                      }}
                    >
                      Months
                    </span>
                  </div>

                  <div className={styles.MetricContainer}>
                    <MetricsCard
                      className={styles.MetricsCardGraph}
                      title={
                        <SpendingPeriod
                          onChange={handlePeriodChange}
                          period={
                            currentUsageTab === "days"
                              ? "days"
                              : currentUsageTab
                              ? "months"
                              : "days"
                          }
                        />
                      }
                    >
                      <BarGraph
                        data={
                          currentUsageTab === "days"
                            ? days
                            : currentUsageTab === "months"
                            ? months
                            : days
                        }
                        height={180}
                        width={200}
                        barSize={30}
                        width_percentage="100%"
                        height_percentage="80%"
                      />
                    </MetricsCard>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.TransactionHistoryWrapper}>
              <div className={styles.TransactionHistoryContainer}>
                <div className={styles.TransactionHistoryHeading}>
                  <span
                    className={
                      currentTab === "transactions"
                        ? styles.CurrentTab
                        : styles.Tab
                    }
                    onClick={() => viewTransactions()}
                  >
                    Transactions
                  </span>
                  <span
                    className={
                      currentTab === "invoices" ? styles.CurrentTab : styles.Tab
                    }
                    onClick={() => viewInvoices()}
                  >
                    Invoices
                  </span>
                  <span
                    className={
                      currentTab === "receipts" ? styles.CurrentTab : styles.Tab
                    }
                    onClick={() => viewReceipts()}
                  >
                    Receipts
                  </span>
                </div>

                {currentTab === "transactions" && (
                  <div className={styles.TransactionHistoryBody}>
                    <div className={styles.TransactionHistoryTable}>
                      <div className={styles.TransactionHistoryHead}>
                      <div className={styles.TransactionHistoryCell}>
                          Date
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Transaction Id
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Status
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Amount
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Details
                        </div>
                      </div>
                      {transactions?.map((entry, index) => (
                        <div
                          className={styles.TransactionHistoryRow}
                          key={index}
                        >
                          <div className={styles.TransactionHistoryCell}>
                            {DisplayDateTime(new Date(entry.date_created))}
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            {entry.transaction_id}
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            <span className={styles.PaymentStatus}>
                              {entry.status}
                            </span>
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            UGX {entry.amount.toLocaleString("en-US")}
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            <button
                              onClick={() =>
                                openReceiptModal(
                                  transactions,
                                  entry.transaction_id
                                )
                              }
                              className={styles.PaymentDetailsButton}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentTab === "invoices" && (
                  <div className={styles.InvoiceHistoryBody}>
                    <div className={styles.InvoiceHistoryTable}>
                      <div className={styles.InvoiceHistoryHead}>
                        <div className={styles.InvoiceHistoryCell}>Date</div>
                        <div className={styles.InvoiceHistoryCell}>
                          Invoice ID
                        </div>
                        <div className={styles.InvoiceHistoryCell}>Amount</div>
                        <div className={styles.InvoiceHistoryCell}>Details</div>
                      </div>
                      <div className={styles.InvoiceHistoryRow}>
                        <div className={styles.InvoiceHistoryCell}>
                          31-01-2022
                        </div>
                        <div className={styles.InvoiceHistoryCell}>
                          87546947
                        </div>
                        <div className={styles.InvoiceHistoryCell}>
                          UGX 40,000
                        </div>
                        <div className={styles.InvoiceHistoryCell}>
                          <button
                            onClick={() => openInvoiceModal()}
                            className={styles.PaymentDetailsButton}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentTab === "receipts" && (
                  <div className={styles.ReceiptHistoryBody}>
                    <div className={styles.ReceiptHistoryTable}>
                      <div className={styles.ReceiptHistoryHead}>
                        <div className={styles.ReceiptHistoryCell}>Date</div>
                        <div className={styles.ReceiptHistoryCell}>
                          Transaction ID
                        </div>
                        <div className={styles.ReceiptHistoryCell}>
                          Invoice ID
                        </div>
                        <div className={styles.ReceiptHistoryCell}>
                          Amount Paid
                        </div>
                        <div className={styles.ReceiptHistoryCell}>Balance</div>
                        <div className={styles.ReceiptHistoryCell}>Details</div>
                      </div>
                      <div className={styles.ReceiptHistoryRow}>
                        <div className={styles.ReceiptHistoryCell}>
                          01-06-2022
                        </div>
                        <div className={styles.ReceiptHistoryCell}>3437533</div>
                        <div className={styles.ReceiptHistoryCell}>
                          87546947
                        </div>
                        <div className={styles.ReceiptHistoryCell}>
                          UGX 40,000
                        </div>
                        <div className={styles.ReceiptHistoryCell}>UGX 0</div>
                        <div className={styles.ReceiptHistoryCell}>
                          <button
                            onClick={() => openReceiptsModal()}
                            className={styles.PaymentDetailsButton}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {viewInvoiceFile && (
              <>
                <div>
                  <Modal
                    showModal={viewInvoiceFile}
                    onClickAway={() => removePreview()}
                  >
                    <div className={styles.ModalHistoryBody} ref={ref}>
                      <div className={styles.ModalHistoryHeading}>
                        <span>
                          <img
                            src="https://raw.githubusercontent.com/crane-cloud/frontend/develop/public/favicon.png"
                            width="50"
                            alt=""
                          />
                        </span>
                        <span>
                          Crane Cloud Project Invoice
                          <br />
                          <div className={styles.InvoiceID}>
                            Invoice ID 87546947
                          </div>
                        </span>
                      </div>

                      <div className={styles.InvoiceModalHistoryTable}>
                        <div className={styles.InvoiceModalHistoryHead}>
                          <div className={styles.InvoiceModalTitle}>
                            Date Generated
                          </div>
                          <div className={styles.InvoiceModalTitle}>
                            Project Name
                          </div>
                          <div className={styles.InvoiceModalTitle}>
                            Total Amount Due
                          </div>
                          <div className={styles.InvoiceModalTitle}>
                            Total Balance Due
                          </div>
                        </div>
                        <div className={styles.InvoiceModalHistoryRow}>
                          <div className={styles.InvoiceHistoryCell}>
                            01-06-2022
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            Rhodin Apps
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            UGX 40,000
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            UGX 40,000
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className={styles.ModalHistoryHeading}>
                        <span>Contact Details</span>
                      </div>
                      <div className={styles.ContactDetails}>
                        Software Center, Level 3, Block B
                        <br />
                        College of Computing and Information Sciences
                        <br />
                        Makerere University Kampala, Uganda
                        <br />
                        <a href="https://cranecloud.io">
                          https://cranecloud.io
                        </a>
                      </div>
                    </div>
                    <div className={styles.ViewFileLowerSection}>
                      <div className={styles.ViewFileModalButtons}>
                        <PrimaryButton
                          label="cancel"
                          className="CancelBtn"
                          onClick={() => removePreview()}
                        />
                        <Pdf
                          targetRef={ref}
                          options={options}
                          onComplete={() => removePreview()}
                          filename="demo-invoice.pdf"
                        >
                          {({ toPdf }) => (
                            <PrimaryButton
                              label="download"
                              className={styles.DownloadButton}
                              onClick={toPdf}
                            />
                          )}
                        </Pdf>
                      </div>
                    </div>
                  </Modal>
                </div>
              </>
            )}

            {viewReceiptFile && (
              <Modal
                showModal={viewReceiptFile}
                onClickAway={() => removePreview()}
              >
                <div className={styles.ModalHistoryBody} ref={ref}>
                  <div className={styles.ModalHistoryHeading}>
                    <span>
                      <img
                        src="https://raw.githubusercontent.com/crane-cloud/frontend/develop/public/favicon.png"
                        width="50"
                        alt=""
                      />
                    </span>
                    <span>
                      Crane Cloud Payment Receipt
                      <br />
                      <div className={styles.InvoiceID}>
                        Transaction ID 3437533
                      </div>
                    </span>
                  </div>

                  <div className={styles.InvoiceModalHistoryTable}>
                    <div className={styles.InvoiceModalHistoryHead}>
                      <div className={styles.ReceiptModalTitle}>
                        Date Generated
                      </div>
                      <div className={styles.ReceiptModalTitle}>Invoice ID</div>
                      <div className={styles.ReceiptModalTitle}>
                        Amount Paid
                      </div>
                      <div className={styles.ReceiptModalTitle}>
                        Available Balance
                      </div>
                    </div>
                    <div className={styles.InvoiceModalHistoryRow}>
                      <div className={styles.InvoiceHistoryCell}>
                        15-06-2022
                      </div>
                      <div className={styles.InvoiceHistoryCell}>87546947</div>
                      <div className={styles.InvoiceHistoryCell}>
                        UGX 40,000
                      </div>
                      <div className={styles.InvoiceHistoryCell}>UGX 0</div>
                    </div>
                  </div>
                  <br />
                  <div className={styles.ModalHistoryHeading}>
                    <span>Contact Details</span>
                  </div>
                  <div className={styles.ContactDetails}>
                    Software Center, Level 3, Block B
                    <br />
                    College of Computing and Information Sciences
                    <br />
                    Makerere University Kampala, Uganda
                    <br />
                    <a href="https://cranecloud.io">https://cranecloud.io</a>
                  </div>
                </div>
                <div className={styles.ViewFileLowerSection}>
                  <div className={styles.ViewFileModalButtons}>
                    <PrimaryButton
                      label="cancel"
                      className="CancelBtn"
                      onClick={() => removePreview()}
                    />
                    <Pdf
                      targetRef={ref}
                      options={options}
                      onComplete={() => removePreview()}
                      filename="demo-receipt.pdf"
                    >
                      {({ toPdf }) => (
                        <PrimaryButton
                          label="download"
                          className={styles.DownloadButton}
                          onClick={toPdf}
                        />
                      )}
                    </Pdf>
                  </div>
                </div>
              </Modal>
            )}

            {viewReceipt && (
              <div>
                <Modal showModal={viewReceipt} onClickAway={closeReceiptModal}>
                  <div className={styles.ReceiptModal}>
                    <div className={styles.ReceiptDetailContainer}>
                      {transactionDetails && (
                        <>
                        <div className={styles.ReceiptLabel}>
                            Transaction Date/Time
                          </div>
                          <div className={styles.ReceiptDetail}>
                            {DisplayDateTime(new Date(transactionDetails.date_created))}
                          </div>
                          <div className={styles.ReceiptLabel}>
                            Transaction reference
                          </div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.flutterwave_ref}
                          </div>
                          <div className={styles.ReceiptLabel}>Name</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.name}
                          </div>
                          <div className={styles.ReceiptLabel}>Email</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.email}
                          </div>
                          <div className={styles.ReceiptLabel}>
                            Payment Status
                          </div>
                          <div className={styles.ReceiptDetail}>
                            <div className={styles.PaymentStatus}>
                              {transactionDetails.status}
                            </div>
                          </div>
                          <div className={styles.ReceiptLabel}>Currency</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.currency}
                          </div>
                          <div className={styles.ReceiptLabel}>Amount Paid</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.amount.toLocaleString("en-US")}
                          </div>
                        </>
                      )}

                      <div className={styles.ReceiptButton}>
                        <PrimaryButton
                          label="Close"
                          className="CancelBtn"
                          onClick={closeReceiptModal}
                        />
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectBillingPage;
