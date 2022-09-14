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
import Checkbox from "../Checkbox";
import FlutterwaveHook from "../FlutterwaveHook";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";
import { ReactComponent as Flutterwave } from "../../assets/images/flutterwave.svg";
import MetricsCard from "../MetricsCard";
import SpendingPeriod from "../SpendingPeriod";
import { useParams } from "react-router-dom";
import styles from "./ProjectBillingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import getProjectBill from "../../redux/actions/getProjectBill";
import getGraphData from "../../redux/actions/getGraphData";
import axios from "axios";
import { LIVE_EXCHANGE_RATE_API } from "../../config";
import { DisplayDateTime } from "../../helpers/dateConstants";
import {
  getTransactions,
  clearTransactions,
} from "../../redux/actions/getTransactions";

import getInvoices, { clearInvoices } from "../../redux/actions/getInvoices";
import getReceipts, { clearReceipts } from "../../redux/actions/getReceipts";
import {
  creditsPayment,
  clearCreditsTransactions,
} from "../../redux/actions/creditsPayments";
import Spinner from "../Spinner";

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
  const { data } = useSelector((state) => state.user);
  const { projectID } = useParams();
  const dispatch = useDispatch();

  const getAllTransactions = useCallback(
    () => dispatch(getTransactions(projectID)),
    [dispatch, projectID]
  );
  const payWithcredits = useCallback(
    (amountObject) => dispatch(creditsPayment(amountObject, projectID)),
    [dispatch, projectID]
  );

  const getAllInvoices = useCallback(
    () => dispatch(getInvoices(projectID)),
    [dispatch, projectID]
  );

  const getAllReceipts = useCallback(
    () => dispatch(getReceipts(projectID)),
    [dispatch, projectID]
  );

  const clearAllReceipts = useCallback(
    () => dispatch(clearReceipts()),
    [dispatch]
  );

  const clearAllInvoices = useCallback(
    () => dispatch(clearInvoices()),
    [dispatch]
  );

  const clearAllTransactions = useCallback(
    () => dispatch(clearTransactions()),
    [dispatch]
  );
  const clearCreditsTransactionsState = useCallback(
    () => dispatch(clearCreditsTransactions()),
    [dispatch]
  );

  const { credits } = useSelector((state) => state.userCreditsReducer);

  const [transactionDetails, setTransactionDetails] = useState({});
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [receiptDetails, setReceiptDetails] = useState({});
  const [viewReceipt, setViewReceipt] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(false);
  const [choosenPaymentOption, setChoosenPaymentOption] = useState("");
  const [currentTab, setCurrentTab] = useState("transactions");
  const [viewInvoiceFile, setViewInvoiceFile] = useState(false);
  const [viewReceiptFile, setViewReceiptFile] = useState(false);
  const [currentUsageTab, setCurrentUsageTab] = useState("days");
  const [months, setMonths] = useState(data2);
  const [days, setDays] = useState([]);
  const [rate, setRate] = useState(1);
  const [inUgx, setInUgx] = useState(false);

  useEffect(() => {
    clearAllTransactions();
    clearAllInvoices();
    clearAllReceipts();
    getAllReceipts();
    getAllTransactions();
    getAllInvoices();
    handleConversion();
    clearCreditsTransactionsState();
  }, [
    clearAllTransactions,
    getAllTransactions,
    clearAllInvoices,
    getAllInvoices,
    clearAllReceipts,
    getAllReceipts,
    clearCreditsTransactionsState,
  ]);

  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { transactions, isRetrieving, isFetched } = useSelector(
    (state) => state.getTransactionsReducer
  );
  const { invoices, isRetrievingInvoices, invoicesFetched } = useSelector(
    (state) => state.getInvoicesReducer
  );
  const { receipts, isRetrievingReceipts, receiptsFetched } = useSelector(
    (state) => state.getReceiptsReducer
  );
  const { creditsSaved, creditsSaving } = useSelector(
    (state) => state.creditsPaymentReducer
  );

  const handleConversion = () => {
    axios
      .get(LIVE_EXCHANGE_RATE_API)
      .then((response) => {
        if (response.status !== 200) {
          return false;
        }
        setRate(response.data.rates.UGX);
      })
      .catch((e) => {
        //failed to load current rate
        setInUgx(false);
      });
  };

  const closeReceiptModal = () => {
    setViewReceipt(false);
  };

  const handleCreditsPayment = (amount) => {
    const amountObject = {
      amount,
    };
    payWithcredits(amountObject);
  };

  const viewTransactions = () => {
    setCurrentTab("transactions");
  };
  const viewInvoices = () => {
    setCurrentTab("invoices");
  };
  const ChangeCurrency = () => {
    if (inUgx && rate === 1) {
      //if the ugx conversion din't work
      handleConversion();
    }
    setInUgx(!inUgx);
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
        getProjectBill(projectID, { series: false, start: startTimeStamp })
      ),
    [dispatch, projectID]
  );
  const graphBillingData = useCallback(
    (startTimeStamp) =>
      dispatch(
        getGraphData(projectID, {
          series: false,
          start: startTimeStamp,
          show_deployments: true,
        })
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
            amount: element.totalCost * rate,
          });
        });
      }
      // let newData2 = newData.slice(4)
      return newData;
    },
    [currentUsageTab, rate]
  );
  // create a function that takes in a array and sums all the object key values to create one object
  // const summationObject = (data) => {
  //   const newData = {};
  //   if (Array.isArray(data)) {
  //     data?.forEach((element) => {
  //       Object.keys(element).forEach((key) => {
  //         if (newData[key]) {
  //           newData[key] += element[key];
  //         } else {
  //           newData[key] = element[key];
  //         }
  //       });
  //     });
  //   }
  //   return newData;
  // };

  useEffect(() => {
    // 7 days ago
    var startTimeStamp = new Date();
    startTimeStamp.setDate(startTimeStamp.getDate() - 14);
    getBill(Math.round(startTimeStamp.getTime() / 1000));
    graphBillingData(Math.round(startTimeStamp.getTime() / 1000));
  }, [getBill, graphBillingData]);

  useEffect(() => {
    if (creditsSaved && !creditsSaving) {
      closePaymentsOptions();
      clearCreditsTransactions();
      window.location.href = "/projects";
    }
  }, [creditsSaved, creditsSaving]);

  const { projectBill } = useSelector((state) => state.getProjectBillReducer);
  const { graphData } = useSelector((state) => state.getGraphDataReducer);
  
  let cost_data = projectBill?.cost_data;
  let billGraph = graphData?.cost_data;
  let graphBillData = billGraph?.deployments_costs;

  useEffect(() => {
    currentUsageTab === "months"
      ? setMonths(getData2Format(graphBillData))
      : setDays(getData2Format(graphBillData));
  }, [graphBillData, currentUsageTab, getData2Format]);

  // let newObject = summationObject(projectBill?.data?.cost_data);
  // turn values to percentages for donut chart

  const data1 = [
    {
      name: "CPU / $1 per 1K seconds",
      value:
        Object.keys(cost_data || {}).length === 0
          ? "n/a"
          : cost_data.totalCost === 0
          ? 0
          : (cost_data.cpuCost / cost_data.totalCost) * 1000,
      color: "#0088FE",
    },
    {
      name: "RAM / $4 per GB",
      value:
        Object.keys(cost_data || {}).length === 0
          ? "n/a"
          : cost_data.totalCost === 0
          ? 0
          : (cost_data.ramCost / cost_data.totalCost) * 1000,
      color: "#00C49F",
    },
    {
      name: "Network / $1 per request",
      value:
        Object.keys(cost_data || {}).length === 0
          ? "n/a"
          : cost_data.totalCost === 0
          ? 0
          : (cost_data.networkCost / cost_data.totalCost) * 1000,
      color: "#FFBB28",
    },
    { name: "Storage/ $1 per GB", value: 0, color: "#FF8042" },
    { name: "Database/ $1 per GB", value: 0, color: "#99D2E9" },
  ];

  const getProjectName = (id) => {
    return projects?.find((project) => project.id === id).name;
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

  const openPaymentsOptions = () => {
    setPaymentOptions(true);
  };
  const closePaymentsOptions = () => {
    setPaymentOptions(false);
  };

  const openInvoiceModal = (invoices, invoiceId) => {
    let invoiceDetail = invoices.find((invoice) => invoice.id === invoiceId);
    setInvoiceDetails(invoiceDetail);
    setViewInvoiceFile(true);
  };
  const openReceiptsModal = (receipts, receiptId) => {
    let receiptDetail = receipts.find((receipt) => receipt.id === receiptId);
    setReceiptDetails(receiptDetail);
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
        graphBillingData(Math.round(startTimeStamp.getTime() / 1000));
      }
      if (period === "7d") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 7);
        graphBillingData(Math.round(startTimeStamp.getTime() / 1000));
      }
      if (period === "3d") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 3);
        graphBillingData(Math.round(startTimeStamp.getTime() / 1000));
      }
      if (period === "all") {
        startTimeStamp = new Date();
        startTimeStamp.setDate(startTimeStamp.getDate() - 14);
        graphBillingData(Math.round(startTimeStamp.getTime() / 1000));
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
            pageRoute={props.location?.pathname}
            allMetricsLink={`/projects/${projectID}/metrics`}
            cpuLink={`/projects/${projectID}/cpu/`}
            memoryLink={`/projects/${projectID}/memory/`}
            databaseLink={`/projects/${projectID}/databases`}
            networkLink={`/projects/${projectID}/network/`}
          />
        </div>
        <div className={styles.MainContentSection}>
          <div>
            <InformationBar
              header="Project Billing"
              credits={credits?.amount}
            />
          </div>
          <div className={styles.SmallContainer}>
            <div className={styles.CBLabel}>
              <Checkbox isBlack onClick={ChangeCurrency} isChecked={inUgx} />
              In UGX
            </div>
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

                          {inUgx ? (
                            <>
                              {" "}
                              {(
                                data1[index % data1.length].value *
                                (cost_data.totalCost / 100) *
                                rate
                              ).toFixed(5)}
                              /={" "}
                            </>
                          ) : (
                            <>
                              $
                              {(
                                data1[index % data1.length].value *
                                (cost_data?.totalCost / 100)
                              ).toFixed(5)}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className={styles.Total}>
                      <div className={styles.TotalTxt}>Total</div>
                      <div className={styles.ResourcePrice}>
                        {Object.keys(cost_data || {}).length === 0
                          ? "n/a"
                          : inUgx
                          ? `${(cost_data?.totalCost * rate).toFixed(5) * 10}/=`
                          : `$${cost_data?.totalCost.toFixed(5) * 10}`}
                      </div>
                    </div>
                  </div>
                  <div className={styles.paymentButton}>
                    <PrimaryButton
                      label="Pay bill"
                      onClick={openPaymentsOptions}
                    />

                    {/* <FlutterwaveHook
                      amount={
                        transactionDetails.amount
                          ? transactionDetails.amount *
                            rate.toFixed(1)
                          : 0
                      }
                      name={data?.name}
                      email={data?.email}
                    /> */}
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

                {currentTab === "transactions" && !isRetrieving && isFetched ? (
                  <div className={styles.TransactionHistoryBody}>
                    <div className={styles.TransactionHistoryTable}>
                      <div className={styles.TransactionHistoryHead}>
                        <div className={styles.TransactionHistoryCell}>
                          Date & Time
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
                              {entry.status === "successful" ||
                              entry.status === "success"
                                ? "successful"
                                : entry.status}
                            </span>
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            {/* inUgx ?<>UGX {(entry.amount.toFixed(2)).toLocaleString("en-US")} </>: 
                            <>$ {((entry.amount/rate).toFixed(2)).toLocaleString("en-US")} </>
                      */}
                            {
                              <>
                                {entry.currency} {entry.amount}
                              </>
                            }
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
                ) : (
                  <>
                    {currentTab === "transactions" && !isFetched && (
                      <div className={styles.NoResourcesMesssage}>
                        No transactions found under this project.
                      </div>
                    )}
                  </>
                )}

                {currentTab === "invoices" &&
                !isRetrievingInvoices &&
                invoicesFetched ? (
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
                      {invoices?.map((invoice, invoiceIndex) => (
                        <div
                          className={styles.InvoiceHistoryRow}
                          key={invoiceIndex}
                        >
                          <div className={styles.InvoiceHistoryCell}>
                            {DisplayDateTime(new Date(invoice.date_created))}
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            {invoice.id}
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            {inUgx ? (
                              <>UGX {invoice.total_amount} </>
                            ) : (
                              <>$ {(invoice.total_amount / rate).toFixed(3)}</>
                            )}
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            <button
                              onClick={() =>
                                openInvoiceModal(invoices, invoice.id)
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
                ) : (
                  <>
                    {currentTab === "invoices" && !isFetched && (
                      <div className={styles.NoResourcesMesssage}>
                        No invoices found under this project.
                      </div>
                    )}
                  </>
                )}

                {currentTab === "receipts" &&
                !isRetrievingReceipts &&
                receiptsFetched ? (
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

                      {receipts?.map((receipt, receiptIndex) => (
                        <div
                          className={styles.ReceiptHistoryRow}
                          key={receiptIndex}
                        >
                          <div className={styles.ReceiptHistoryCell}>
                            {DisplayDateTime(new Date(receipt.date_created))}
                          </div>
                          <div className={styles.ReceiptHistoryCell}>
                            {receipt.transaction_id}
                          </div>
                          <div className={styles.ReceiptHistoryCell}>
                            {receipt.billing_invoice_id
                              ? receipt.billing_invoice_id
                              : "None"}
                          </div>
                          <div className={styles.ReceiptHistoryCell}>
                            {inUgx ? (
                              <>UGX {receipt.amount} </>
                            ) : (
                              <>$ {(receipt.amount / rate).toFixed(3)}</>
                            )}
                          </div>
                          <div className={styles.ReceiptHistoryCell}>UGX 0</div>
                          <div className={styles.ReceiptHistoryCell}>
                            <button
                              onClick={() =>
                                openReceiptsModal(receipts, receipt.id)
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
                ) : (
                  <>
                    {currentTab === "receipts" && !receiptsFetched && (
                      <div className={styles.NoResourcesMesssage}>
                        No receipts found under this project.
                      </div>
                    )}
                  </>
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
                            Invoice ID {invoiceDetails.id}
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
                            {DisplayDateTime(
                              new Date(invoiceDetails.date_created)
                            )}
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            {getProjectName(projectID)}
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            {inUgx ? (
                              <>UGX {invoiceDetails.total_amount} </>
                            ) : (
                              <>
                                ${" "}
                                {(invoiceDetails.total_amount / rate).toFixed(
                                  3
                                )}
                              </>
                            )}
                          </div>
                          <div className={styles.InvoiceHistoryCell}>
                            {inUgx ? (
                              <>UGX {invoiceDetails.total_amount} </>
                            ) : (
                              <>
                                ${" "}
                                {(invoiceDetails.total_amount / rate).toFixed(
                                  3
                                )}
                              </>
                            )}
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
            {/**Not converting recipts printable to Dollars since amount has already been paid */}
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
                        Transaction ID {receiptDetails.id}
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
                        {DisplayDateTime(new Date(receiptDetails.date_created))}
                      </div>
                      <div className={styles.InvoiceHistoryCell}>
                        {receiptDetails.billing_invoice_id}
                      </div>
                      <div className={styles.InvoiceHistoryCell}>
                        UGX {receiptDetails.amount}
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
                            Transaction Date & Time
                          </div>
                          <div className={styles.ReceiptDetail}>
                            {DisplayDateTime(
                              new Date(transactionDetails.date_created)
                            )}
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
                          <div className={styles.ReceiptLabel}>
                            Currency of payment
                          </div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.currency}
                          </div>
                          <div className={styles.ReceiptLabel}>Amount Paid</div>
                          <div className={styles.ReceiptDetail}>
                            UGX{" "}
                            {transactionDetails.amount
                              .toFixed(3)
                              .toLocaleString("en-US")}
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

            {paymentOptions && (
              <div>
                <Modal
                  showModal={paymentOptions}
                  onClickAway={closePaymentsOptions}
                >
                  <div className={styles.OptionsModal}>
                    <div className={styles.MainModalTitle}>
                      Choose payment form
                    </div>
                    <div className={styles.SubModalTitle}>
                      Click one of the options below
                    </div>
                    <div className={styles.PaymentForms}>
                      <div
                        className={
                          choosenPaymentOption === "credits"
                            ? styles.SelectedPaymentFormBox
                            : styles.PaymentFormBox
                        }
                        title="1 credit is equivalent to a USD"
                        onClick={() => {
                          setChoosenPaymentOption("credits");
                        }}
                      >
                        <div className={styles.PaymentText}> Credits</div>
                        <div className={styles.CoinSize}>
                          <Coin />
                        </div>
                      </div>
                      <div
                        className={
                          choosenPaymentOption === "flutterwave"
                            ? styles.SelectedPaymentFormBox
                            : styles.PaymentFormBox
                        }
                        onClick={() => {
                          setChoosenPaymentOption("flutterwave");
                        }}
                      >
                        <div className={styles.PaymentText}>Cash/Card</div>
                        <div className={styles.Iconsection}>
                          Powered by
                          <div className={styles.FlutterWaveSize}>
                            <Flutterwave />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.OptionButtons}>
                      <PrimaryButton
                        label="Close"
                        className="CancelBtn"
                        onClick={closePaymentsOptions}
                      />

                      {choosenPaymentOption === "credits" && (
                        <PrimaryButton
                          label={creditsSaving ? <Spinner /> : "Proceed"}
                          onClick={() => {
                            //add current invoice price
                            handleCreditsPayment(1);
                          }}
                        />
                      )}
                      {choosenPaymentOption === "flutterwave" && (
                        <FlutterwaveHook
                          //add current invoice price
                          amount={0}
                          name={data?.name}
                          email={data?.email}
                        />
                      )}
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
